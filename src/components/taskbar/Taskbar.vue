<template lang="pug">
.taskbar-container.fixed-bottom.bg-secondary
  .line.bg-secondary
  .line.bg-white
  .w-100.p-1.d-flex.justify-content-between
    .d-flex.py-1.ms-1
      button.rounded.btn.me-1.text-black(variant="dark" @click="changeShowMenu()" :class="showMenu ? 'bg-shadow-inner' : 'bg-shadow'")
        i.bi.bi-menu-button-wide.me-1
        |   Start
      .programs-container.d-flex
        .taskbar-item.bg-secondary.h-100.pe-4.ps-2.d-flex.align-items-center.rounded.text-black.pointer(
          v-for="(item, index) in activePrograms" 
          :key="index"
          :class="item.IsActive ? 'bg-shadow-inner' : 'bg-shadow'"
          @click="setActiveState(item)"
        )
          i(:class="item.Image" height="25").m-2.mt-0
          | {{ item.DisplayName }}
    Clock 
</template>

<script lang="ts">
import Clock from './Clock.vue'
import { programsStore } from '@/stores/programsStore'
import type { IProgram } from '@/models/index'
import { defineComponent } from 'vue'

export default defineComponent({
  components: {
    Clock
  },
  props: {
    showMenu: Boolean
  },
  data() {
    return {
      programsstore: programsStore(),
    }
  },
  computed: {
    activePrograms(): IProgram[] {
      return this.programsstore.getActivePrograms
    }
  },
  methods: {
    changeShowMenu() {
      this.$emit('changeShowMenu')      
    },
    setActiveState(program: IProgram) {
      this.programsstore.setProgramActiveState(program)
    }
  }
})
</script>
  