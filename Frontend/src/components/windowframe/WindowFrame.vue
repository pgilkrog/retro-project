<template lang="pug">
Teleport(to="#app")
  Transition(name="window-animation" appear)
    .wrapper(
      class="bg-shadow bg-gray-300 flex flex-col absolute p-2 rounded px-2"
      v-if="program?.isActive === true" 
      :style="[ isMoveable ? { top: top + 'px', left: left + 'px'} : {}]"
      @mousedown="handleMouseDown"
      :id="program._id"
    )
      header(class="top-bar flex justify-between items-center mb-1 p-2 px-4 rounded" 
        :class="getBackgroundColor(variant)" 
      )
        div(class="flex items-center content-center")
          IconComponent(:name="program.image" size="25" variant="light")
          p.font-semibold.pe-4.ps-4.text-2xl {{ program.displayName }}
        div(class="flex")
          Btn(icon="fa-window-minimize" @clicked="setInactive()" size="small")
          Btn(icon="fa-square" size="small")
          Btn(icon="fa-xmark" @clicked="closeWindow()" size="small")
      windowframeMenu(:showMenu="showMenu")
      div(class="bg-gray-300 bg-shadow-inner rounded")
        slot
</template>

<script setup lang="ts">
import type { IProgram } from '@/models/index'
import { programsStore } from '@/stores/programsStore'
import type { PropType } from 'vue'
import { ref } from 'vue'
import WindowframeMenu from './windowframeMenu.vue'

const { showMenu = false, program, variant = 'blue', isNotProgram, isMoveable = true } = defineProps({
  showMenu: Boolean,
  program: Object as PropType<IProgram>,
  variant: String,
  isNotProgram: Boolean,
  isMoveable: Boolean
})

const emit = defineEmits([
  'closeWindow'
])

const programsstore = programsStore()

const isDragging = ref(false)
const startX = ref(0)
const startY = ref(0)
const left = ref(40)
const top = ref(40)

const closeWindow = () => {
  // Remove the program from the active program list
  if (program) programsstore.removeProgramFromActive(program)
  
  // If the window is not a program but a form of popup emit the close window
  if (isNotProgram === true) emit('closeWindow')
}

const setInactive = () => {
  // Set if the window should be hidden on screen, but visible in the taskbar.
  if (program) programsstore.setProgramActiveState(program)
}

const handleMouseDown = (event: MouseEvent) => {
  if (isMoveable === true) {
    const target = event.target as HTMLElement;
    
    if (target.classList.contains('top-bar')) {
      startDrag(event);
    }
  }
}

const getBackgroundColor = (color: string) => {
  switch(color) {
    case 'yellow':
      return 'bg-yellow-500'
    case 'red':
      return 'bg-red-500'
    case 'green':
      return 'bg-green-500'
    default:
      return 'bg-blue-500'
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

  left.value += deltaX
  top.value += deltaY

  startX.value = event.clientX
  startY.value = event.clientY
}

const stopDrag = () => {
  isDragging.value = false
  document.removeEventListener('mousemove', onDrag)
  document.removeEventListener('mouseup', stopDrag)      
}
</script>