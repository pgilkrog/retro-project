<template lang="pug">
.window-frame-wrapper.bg-shadow.bg-dark.d-flex.flex-column.position-absolute.m-4.p-2(v-if="program !== undefined")
  header.top-bar.bg-success.text-dark.d-flex.justify-content-between.align-items-center.p-2()
    i(:class="program.Image" width="25")
    .font-weight-bold.pe-4.ps-2 {{ program.Name }}
    span
      button.bg-dark.py-0.px-2.text-light.bg-inner-shadow _
      button.bg-dark.py-0.px-2.text-light.bg-inner-shadow.mx-1 =
      button.bg-dark.py-0.px-2.text-light.bg-inner-shadow(v-on:click="closeWindow()") x
  .menu-container.d-flex.mx-2.my-1(v-if="showMenu")
    .me-2 File
    .mx-2 Edit 
    .mx-2 View
    .ms-2 Help
  .container.bg-dark.p-1
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
