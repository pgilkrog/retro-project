<template lang="pug">
.window-frame-wrapper.bg-shadow.bg-secondary.d-flex.flex-column.position-absolute.m-4.p-2.rounded(v-if="program !== undefined && program.IsActive === true")
  header.top-bar.text-dark.d-flex.justify-content-between.align-items-center.mb-1.p-2(:class="variant !== undefined ? 'bg-'+variant : 'bg-success'")
    i(:class="program.Image" width="25")
    .font-weight-bold.pe-4.ps-2 {{ program.Name }}
    span
      button.btn.bg-secondary.py-0.px-2.text-black(@click="setInactive()") _
      button.btn.bg-secondary.py-0.px-2.text-black.mx-1 =
      button.btn.bg-secondary.py-0.px-2.text-black(@click="closeWindow()") x
  .menu-container.d-flex.mx-2.my-1(v-if="showMenu")
    .me-2 File
    .mx-2 Edit 
    .mx-2 View
    .ms-2 Help
  .bg-secondary.mt-1.bg-shadow-inner.rounded.gx-0
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
    isNotProgram: Boolean
  },
  data() {
    return {
      programsstore: programsStore()
    }
  },
  methods: {
    closeWindow() {
      if (this.program !== undefined)
        this.programsstore.removeProgramFromActive(this.program)
      
      if (this.isNotProgram === true)
        this.$emit('closeWindow')
    },
    setInactive() {
      if (this.program !== undefined)
        this.programsstore.setProgramActiveState(this.program)
    }
  }
})
</script>
