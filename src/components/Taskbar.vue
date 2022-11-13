<template lang="pug">
.taskbar-container.fixed-bottom.shadow-top.bg-dark
  .w-100.p-1.d-flex.justify-content-between
    .d-flex.py-1
      button.btn.me-1.text-light.rounded(v-on:click="changeShowMenu()" :class="showMenu ? 'bg-inner-shadow' : 'bg-shadow'")
        i.text-light.bi.bi-menu-button-wide.me-1
        |   Start
      .programs-container.d-flex
        .taskbar-item.bg-dark.bg-inner-shadow.h-100.pe-4.ps-2.d-flex.align-items-center.rounded.text-light(v-for="(item, index) in activePrograms" :key="index")
          i(:class="item.Image" height="25").m-2
          |   {{ item.DisplayName }}
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
    showMenu: Boolean
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
  