<template lang="pug">
.window-frame-wrapper.bg-shadow.bg-secondary.d-flex.flex-column.position-absolute.m-4.p-2.rounded(v-if="program !== undefined")
  header.top-bar.text-dark.d-flex.justify-content-between.align-items-center.mb-1.p-2(:class="variant !== undefined ? 'bg-'+variant : 'bg-success'")
    i(:class="program.Image" width="25")
    .font-weight-bold.pe-4.ps-2 {{ program.Name }}
    span
      button.bg-secondary.py-0.px-2.text-black.bg-shadow _
      button.bg-secondary.py-0.px-2.text-black.bg-shadow.mx-1 =
      button.bg-secondary.py-0.px-2.text-black.bg-shadow(v-on:click="closeWindow()") x
  .menu-container.d-flex.mx-2.my-1(v-if="showMenu")
    .me-2 File
    .mx-2 Edit 
    .mx-2 View
    .ms-2 Help
  .container.bg-secondary.mt-1.bg-shadow-inner.rounded.gx-0
    slot
</template>
  
<script lang="ts">
import type { IProgram } from '@/models/IProgram'
import { programsStore } from '@/stores/programsStore'
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    showMenu: Boolean,
    program: Object,
    variant: String,
  },
  data() {
    return {
      programsstore: programsStore(),
    }
  },
  methods: {
    closeWindow() {
      this.programsstore.removeProgramFromActive(this.program as IProgram)
    }
  }
})
</script>
