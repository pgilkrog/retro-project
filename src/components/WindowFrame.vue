<template lang="pug">
.window-frame-wrapper.st-border.bg-secondary.d-flex.flex-column.st-border.position-absolute(v-if="program !== undefined")
  header.top-bar.bg-primary.text-white.d-flex.justify-content-between.align-items-center.p-2()
    img(:src="program.Image" width="25")
    .font-weight-bold.pe-4.ps-2 {{ program.Name }}
    span
      button.bg-secondary.py-0.px-2.text-black.st-border _
      button.bg-secondary.py-0.px-2.text-black.st-border =
      button.bg-secondary.py-0.px-2.text-black.st-border(v-on:click="closeWindow()") x
  .menu-container.d-flex.mx-2.my-1(v-if="showMenu")
    .me-2 File
    .mx-2 Edit 
    .mx-2 View
    .ms-2 Help
  .container.bg-secondary.p-1
    slot
</template>
  
<script lang="ts">
import type { IProgram } from '@/models/IProgram';
import { programsStore } from '@/stores/programsStore';
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    showMenu: Boolean,
    program: Object
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
