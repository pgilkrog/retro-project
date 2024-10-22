<template lang="pug">
Teleport(to="#app")
  .window-wrapper(
    v-if="program?.isActive === true" 
    :id="program._id"
    class="bg-shadow bg-gray-300 flex flex-col absolute p-2 rounded px-2"
    :style="[ isMoveable ? { top: program.top + 'px', left: program.left + 'px'} : { top: '40%', left: '50%', transform: 'translate(-50%, -50%)' }]"
  )
    header(
      :class="['top-bar flex flex-col-reverse sm:flex-row justify-between items-center mb-1 py-2 px-4 rounded bg-gradient-to-r', getBackgroundColor(variant)]" 
      @mousedown="handleMouseDown"
    )
      div(class="flex items-center content-center pointer-events-none mt-6 sm:mt-0")
        IconComponent(:name="program.image" size="25" color="light")
        p.font-semibold.pe-4.ps-4.text-2xl {{ program.displayName }}
      div(class="flex")
        ButtonComponent(
          v-for="(button, key) in menuButtons"
          :key
          :icon="button.icon"
          @clicked="button.clicked()"
          :size="'small'"
          :disabled="disableButtons"
        )
    windowframeMenu(:showMenu)
    div(class="bg-gray-300 bg-shadow-inner rounded")
      slot
</template>

<script setup lang="ts">
import type { IProgram } from '@/models/index'
import { programsStore } from '@/stores/programsStore'
import anime from 'animejs'

const {
  showMenu = false,
  disableButtons = false,
  program,
  variant = 'blue',
  isNotProgram = false,
  isMoveable = true,
} = defineProps<{
  showMenu?: boolean
  disableButtons?: boolean
  program: IProgram
  variant?: string
  isNotProgram?: boolean
  isMoveable?: boolean
}>()

const emit = defineEmits<{
  (e: 'closeWindow'): void
}>()

const programsstore = programsStore()

const isDragging = ref(false)
const startX = ref(0)
const startY = ref(0)

const menuButtons = [
  {
    icon: 'fa-window-minimize',
    clicked: () => setInactive(),
  },
  {
    icon: 'fa-square',
    clicked: () => {},
  },
  {
    icon: 'fa-xmark',
    clicked: () => closeWindow(),
  },
]

onMounted(() => {
  anime({
    targets: '.window-wrapper',
    translateX: 350,
    translateY: 450,
    scale: 0.01,
    easing: 'easeInOutQuad',
    direction: 'reverse',
    duration: 500,
  })
})

const closeWindow = () => {
  // Remove the program from the active program list
  if (program) programsstore.removeProgramFromActive(program)

  // If the window is not a program but a form of popup emit the close window
  if (isNotProgram === true) emit('closeWindow')
}

const setInactive = async () => {
  // Set if the window should be hidden on screen, but visible in the taskbar.
  if (program) {
    await anime({
      targets: '.window-wrapper',
      translateX: 350,
      translateY: 450,
      scale: 0.01,
      easing: 'easeInOutQuad',
      duration: 500,
    })
    programsstore.setProgramActiveState(program)
  }
}

const handleMouseDown = (event: MouseEvent) => {
  if (isMoveable === true) {
    const target = event.target as HTMLElement

    if (target.classList.contains('top-bar')) {
      startDrag(event)
    }
  }
}

const getBackgroundColor = (color: string) => {
  switch (color) {
    case 'yellow':
      return 'from-yellow-500 to-yellow-300'
    case 'red':
      return 'from-red-500 to-red-300'
    case 'green':
      return 'from-green-500 to-green-300'
    default:
      return 'from-blue-500 to-blue-300'
  }
}

const startDrag = (event: MouseEvent) => {
  if (isMoveable === true) {
    isDragging.value = true
    startX.value = event.clientX
    startY.value = event.clientY
    document.addEventListener('mousemove', onDrag)
    document.addEventListener('mouseup', stopDrag)
  }
}

const onDrag = (event: MouseEvent) => {
  if (!isDragging.value) return

  const deltaX = event.clientX - startX.value
  const deltaY = event.clientY - startY.value

  program.left += deltaX
  program.top += deltaY

  startX.value = event.clientX
  startY.value = event.clientY
}

const stopDrag = () => {
  isDragging.value = false
  document.removeEventListener('mousemove', onDrag)
  document.removeEventListener('mouseup', stopDrag)
}
</script>
