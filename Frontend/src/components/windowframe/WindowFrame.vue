<template lang="pug">
Teleport(to="#app")
  Transition(name="window-animation" appear)
    .window-frame-wrapper.bg-shadow.bg-secondary.d-flex.flex-column.position-absolute.p-2.rounded(
      v-if="program?.isActive === true" 
      :style="[ isMoveable ? { top: top + 'px', left: left + 'px'} : {}]"
    )
      header.top-bar.text-light.d-flex.justify-content-between.align-items-center.mb-1.p-2.px-4.rounded(
        :class="variant !== undefined ? 'bg-'+ variant : 'bg-primary'" 
        @mousedown="startDrag" 
      )
        .d-flex.align-items-center.align-content.center
          IconComponent(:name="program.image" size="25" variant="light")
          .font-weight-bold.pe-4.ps-4 {{ program.displayName }}
        .d-flex
          Btn(icon="fa-window-minimize" @clicked="setInactive()" size="small")
          Btn(icon="fa-square" size="small")
          Btn(icon="fa-xmark" @clicked="closeWindow()" size="small")
      windowframeMenu(:showMenu="showMenu")
      .container-fluid.gx-0.bg-secondary.mt-1.bg-shadow-inner.rounded
        slot
</template>

<script setup lang="ts">
import type { IProgram } from '@/models/index'
import { programsStore } from '@/stores/programsStore'
import type { PropType } from 'vue'
import { ref } from 'vue'
import WindowframeMenu from './windowframeMenu.vue'

interface Props {
  showMenu: Boolean,
  program: Object,
  variant: String,
  isNotProgram: Boolean,
  isMoveable: Boolean,
  type: String
}

const { showMenu, program, variant, isNotProgram, isMoveable, type } = defineProps({
  showMenu: Boolean,
  program: Object as PropType<IProgram>,
  variant: String,
  isNotProgram: Boolean,
  isMoveable: Boolean,
  type: String
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
<style scoped lang="sass">
.window-frame-wrapper
  top: 0
  .top-bar
    user-select: none
</style>
