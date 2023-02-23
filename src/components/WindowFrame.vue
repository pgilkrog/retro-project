<template lang="pug">
.window-frame-wrapper.bg-shadow.bg-secondary.d-flex.flex-column.position-absolute.m-4.p-2.rounded(
  v-if="program !== undefined && program.IsActive === true" 
  :style="[ isMoveable ? { top: top + 'px', left: left + 'px'} : {}]"
)
  header.top-bar.text-dark.d-flex.justify-content-between.align-items-center.mb-1.p-2(:class="variant !== undefined ? 'bg-'+variant : 'bg-success'" @mousedown="startDrag" )
    .d-flex.align-items-center
      i(:class="program.Image" width="25")
      .font-weight-bold.pe-4.ps-4 {{ program.Name }}
    span
      button.btn.bg-secondary.py-0.px-2.text-black(@click="setInactive()") _
      button.btn.bg-secondary.py-0.px-2.text-black.mx-1 =
      button.btn.bg-secondary.py-0.px-2.text-black(@click="closeWindow()") x
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
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    showMenu: Boolean,
    program: Object as PropType<IProgram>,
    variant: String,
    isNotProgram: Boolean,
    isMoveable: Boolean
  },
  data() {
    return {
      programsstore: programsStore(),
      isDragging: false,
      startX: 0,
      startY: 0,
      left: 0,
      top: 0,
    }
  },
  methods: {
    closeWindow() {
      // Remove the program from the active program list
      if (this.program !== undefined)
        this.programsstore.removeProgramFromActive(this.program)
      
      // If the window is not a program but a form of popup emit the close window
      if (this.isNotProgram === true)
        this.$emit('closeWindow')
    },
    setInactive() {
      // Set if the window should be hidden on screen, but visible in the taskbar.
      if (this.program !== undefined)
        this.programsstore.setProgramActiveState(this.program)
    },
    startDrag(event: MouseEvent) {
      if (this.isMoveable === true) {
        this.isDragging = true
        this.startX = event.clientX
        this.startY = event.clientY    
        document.addEventListener('mousemove', this.onDrag)
        document.addEventListener('mouseup', this.stopDrag)        
      }
    },
    onDrag(event: MouseEvent) {
      if (!this.isDragging) return

      const deltaX = event.clientX - this.startX
      const deltaY = event.clientY - this.startY

      this.left += deltaX
      this.top += deltaY

      this.startX = event.clientX
      this.startY = event.clientY
    },
    stopDrag() {
      this.isDragging = false
      document.removeEventListener('mousemove', this.onDrag)
      document.removeEventListener('mouseup', this.stopDrag)      
    }
  },
})
</script>
