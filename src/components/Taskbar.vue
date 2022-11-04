<template lang="pug">
.taskbar-container.fixed-bottom
  .line.bg-secondary
  .line.bg-white
  .w-100.bg-secondary.p-1.d-flex.justify-content-between
    .d-flex
      button.btn.st-border.me-1(v-on:click="changeShowMenu()")
        img(src="https://win98icons.alexmeub.com/icons/png/windows-5.png" height="25")
        |   Start
      .programs-container.d-flex
        .taskbar-item.bg-secondary.st-border.h-100.pe-4.ps-2.d-flex.align-items-center(v-for="(item, index) in activePrograms" :key="index")
          img(:src="item.Image" height="25").m-2
          |   {{ item.DisplayName }}
    .left-bar.d-flex.align-items-center.p-2.light-border
      Clock 
  </template>
      
<script lang="ts">
import Clock from './Clock.vue'
import { programsStore } from '@/stores/programsStore'
import type { IProgram } from '@/models/IProgram'
import { computed } from 'vue'

export default {
  components: {
    Clock
  },
  props: {

  },
  data() {
    return {
      programsstore: programsStore(),
      activePrograms: {}
    }
  },
  methods: {
    changeShowMenu() {
      this.$emit('changeShowMenu')      
    }
  },
  mounted() {
    this.activePrograms = computed(() => this.programsstore.getActivePrograms as IProgram[])
  }
}
</script>
  