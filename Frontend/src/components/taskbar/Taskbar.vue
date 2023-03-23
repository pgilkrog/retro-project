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
          i(:class="item.image" height="25").m-2.mt-0
          | {{ item.displayName }}
    Clock 
</template>

<script lang="ts">
import Clock from './Clock.vue'
import { programsStore } from '@/stores/programsStore'
import type { IProgram } from '@/models/index'
import { defineComponent, computed } from 'vue'

export default defineComponent({
  components: {
    Clock
  },
  props: {
    showMenu: Boolean
  },
  setup (props, { emit }) {
    const programsstore = programsStore()

    const activePrograms = computed(() => programsstore.getActivePrograms)

    const changeShowMenu = () => {
      emit('changeShowMenu')      
    }
    const setActiveState = (program: IProgram) => {
      programsstore.setProgramActiveState(program)
    }

    return {
      activePrograms,
      changeShowMenu,
      setActiveState
    }
  }
})
</script>
  