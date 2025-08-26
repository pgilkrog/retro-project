<template>
  <Teleport to="#app">
    <div
      v-if="program?.isActive === true"
      :id="'win-' + program._id"
      class="window-wrapper bg-shadow bg-gray-300 flex flex-col absolute p-2 px-2"
      :style="[
        isMoveable
          ? { top: programY + 'px', left: programX + 'px' }
          : { top: '40%', left: '50%', transform: 'translate(-50%, -50%)' },
      ]"
      v-bind="$attrs"
    >
      <header
        :class="[
          'top-bar flex flex-col-reverse sm:flex-row justify-between items-center mb-1 py-2 px-4  bg-gradient-to-r',
          getBackgroundColor(variant),
        ]"
        @mousedown="handleMouseDown"
      >
        <div class="flex items-center content-center pointer-events-none mt-6 sm:mt-0">
          <IconComponent
            :name="program.image"
            size="25"
            color="light"
          />
          <p class="font-semibold pe-4 ps-4 text-2xl">
            {{ program.displayName }}
          </p>
        </div>
        <div class="flex">
          <ButtonComponent
            v-for="(button, key) in menuButtons"
            :key="key"
            :icon="button.icon"
            :size="'small'"
            :disabled="disableButtons"
            @clicked="button.clicked()"
          />
        </div>
      </header>
      <windowframeMenu :show-menu="showMenu" />
      <div class="bg-gray-300 bg-shadow-inner">
        <slot />
      </div>
    </div>
  </Teleport>
</template>
<script setup lang="ts">
import type { IProgram } from '@/models/index'
import { programsStore } from '@/stores/programsStore'
import { animate } from 'animejs'

const {
  showMenu = false,
  disableButtons = false,
  program,
  variant = 'blue',
  isNotProgram = false,
  isMoveable = true,
  isStatic = false,
} = defineProps<{
  showMenu?: boolean
  disableButtons?: boolean
  program: IProgram
  variant?: string
  isNotProgram?: boolean
  isMoveable?: boolean
  isStatic?: boolean
}>()

const emit = defineEmits<{
  closeWindow: []
}>()

const programsstore = programsStore()

const isDragging = ref<boolean>(false)
const startX = ref<number>(0)
const startY = ref<number>(0)

const programX = ref<number>(0)
const programY = ref<number>(0)

const menuButtons = [
  {
    icon: 'fa-window-minimize',
    clicked: () => {
      setInactive()
    },
  },
  {
    icon: 'fa-square',
    clicked: () => {
      console.log('hjfdgkh')
    },
  },
  {
    icon: 'fa-xmark',
    clicked: () => {
      closeWindow()
    },
  },
]

onMounted(() => {
  programX.value = program.left
  programY.value = program.top

  if (isStatic === false) {
    animate(`#win-${program._id}`, {
      translateY: [window.innerHeight, programY.value],
      translateX: [0, programX.value],
      scale: {
        to: [0.2, 1],
        delay: 200,
      },
      opacity: [0, 1],
      easing: 'easeOutBack',
      duration: 500,
    })
  }
})

const closeWindow = () => {
  // Remove the program from the active program list
  programsstore.removeProgramFromActive(program)

  // If the window is not a program but a form of popup emit the close window
  if (isNotProgram === true) {
    emit('closeWindow')
  }
}

const setInactive = () => {
  // Set if the window should be hidden on screen, but visible in the taskbar.
  animate(`#win-${program._id}`, {
    translateY: [programY.value, window.innerHeight],
    translateX: [programX.value, 0],
    scale: {
      to: [1, 0.3],
      delay: 200,
    },
    opacity: [1, 0],
    easing: 'easeInBack',
    duration: 500,
    onComplete: () => {
      programsstore.setProgramActiveState(program)
    },
  })
}

const handleMouseDown = (event: MouseEvent) => {
  if (isMoveable === true) {
    const target = event.target as HTMLElement

    if (target.classList.contains('top-bar')) {
      startDrag(event)
    }
  }
}

const getBackgroundColor = (color: string): string => {
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
  if (isDragging.value === false) {
    return
  }

  const deltaX = event.clientX - startX.value
  const deltaY = event.clientY - startY.value

  programX.value += deltaX
  programY.value += deltaY

  startX.value = event.clientX
  startY.value = event.clientY
}

const stopDrag = () => {
  isDragging.value = false
  document.removeEventListener('mousemove', onDrag)
  document.removeEventListener('mouseup', stopDrag)
}
</script>
