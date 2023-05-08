<template lang="pug">
.window-frame-wrapper.bg-shadow.bg-secondary.d-flex.flex-column.position-absolute.p-2.rounded(
  v-if="program?.isActive === true" 
  :style="[ isMoveable ? { top: top + 'px', left: left + 'px'} : {}]"
)
  header.top-bar.text-dark.d-flex.justify-content-between.align-items-center.mb-1.p-2.px-4.rounded(:class="variant !== undefined ? 'bg-'+ variant : 'bg-primary'" @mousedown="startDrag" )
    .d-flex.align-items-center.align-content.center
      IconComponent(:name="program.image" size="25")
      .font-weight-bold.pe-4.ps-4 {{ program.displayName }}
    .d-flex
      button.btn.bg-secondary.py-0.px-2.text-black(@click="setInactive()") 
        IconComponent(name="fa-window-minimize" size="14")
      button.btn.bg-secondary.py-0.px-2.text-black.mx-1
        IconComponent(name="bi-square" size="12")
      button.btn.bg-secondary.py-0.px-2.text-black(@click="closeWindow") 
        IconComponent(name="fa-xmark" size="14")
  windowframeMenu(:showMenu="showMenu")
  .container-fluid.gx-0.bg-secondary.mt-1.bg-shadow-inner.rounded
    slot
</template>

<script lang="ts">
import type { IProgram } from '@/models/index'
import { programsStore } from '@/stores/programsStore'
import type { PropType } from 'vue'
import { defineComponent, ref } from 'vue'
import windowframeMenu from './windowframeMenu.vue'

interface Props {
  showMenu: Boolean,
  program: Object,
  variant: String,
  isNotProgram: Boolean,
  isMoveable: Boolean
}

export default defineComponent({
  props: {
    showMenu: Boolean,
    program: Object as PropType<IProgram>,
    variant: String,
    isNotProgram: Boolean,
    isMoveable: Boolean
  },
  components: {
    windowframeMenu
  },
  setup (props, { emit }) {
    const programsstore = programsStore()

    const isDragging = ref(false)
    const startX = ref(0)
    const startY = ref(0)
    const left = ref(40)
    const top = ref(40)

    const closeWindow = () => {
      const { program, isNotProgram } = props
      // Remove the program from the active program list
      if (program) programsstore.removeProgramFromActive(program)
      
      // If the window is not a program but a form of popup emit the close window
      if (isNotProgram === true) emit('closeWindow')
    }
    
    const setInactive = () => {
      const { program } = props

      // Set if the window should be hidden on screen, but visible in the taskbar.
      if (program) programsstore.setProgramActiveState(program)
    }

    const startDrag = (event: MouseEvent) => {
      if (props.isMoveable === true) {
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

    return {
      programsstore,
      isDragging,
      startX,
      startY,
      left,
      top,
      closeWindow,
      setInactive,
      startDrag,
      onDrag,
      stopDrag
    }
  },
})
</script>
