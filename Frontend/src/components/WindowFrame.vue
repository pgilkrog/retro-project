<template lang="pug">
.window-frame-wrapper.bg-shadow.bg-secondary.d-flex.flex-column.position-absolute.m-4.p-2.rounded(
  v-if="program !== undefined && program.IsActive === true" 
  :style="[ isMoveable ? { top: top + 'px', left: left + 'px'} : {}]"
)
  header.top-bar.text-dark.d-flex.justify-content-between.align-items-center.mb-1.p-2(:class="variant !== undefined ? 'bg-'+variant : 'bg-success'" @mousedown="startDrag" )
    .d-flex.align-items-center
      i(:class="program.Image" width="25")
      .font-weight-bold.pe-4.ps-4 {{ program.DisplayName }}
    span
      button.btn.bg-secondary.py-0.px-2.text-black(@click="setInactive()") _
      button.btn.bg-secondary.py-0.px-2.text-black.mx-1 =
      button.btn.bg-secondary.py-0.px-2.text-black(@click="closeWindow") x
  .menu-container.d-flex.mx-2.my-1(v-if="showMenu")
    .me-2 File
    .mx-2 Edit 
    .mx-2 View
    .ms-2 Help
  .container-fluid.gx-0.bg-secondary.mt-1.bg-shadow-inner.rounded
    slot
</template>

<script lang="ts">
import type { IProgram } from '@/models/index'
import { programsStore } from '@/stores/programsStore'
import type { PropType } from 'vue'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  props: {
    showMenu: Boolean,
    program: Object as PropType<IProgram>,
    variant: String,
    isNotProgram: Boolean,
    isMoveable: Boolean
  },
  setup (props, { emit }) {
    const programsstore = programsStore()

    const isDragging = ref(false)
    const startX = ref(0)
    const startY = ref(0)
    const left = ref(0)
    const top = ref(0)

    const closeWindow = () => {
      // Remove the program from the active program list
      if (props.program !== undefined)
      programsstore.removeProgramFromActive(props.program)
      
      // If the window is not a program but a form of popup emit the close window
      if (props.isNotProgram === true)
        emit('closeWindow')
    }
    
    const setInactive = () => {
      // Set if the window should be hidden on screen, but visible in the taskbar.
      if (props.program !== undefined)
        programsstore.setProgramActiveState(props.program)
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
