<template lang="pug">
Component(
  v-for="(program, index) in activePrograms"
  :key="index"
  :is="program.name"
  :program="program"
)
</template>

<script lang="ts">
import { defineComponent, computed, defineAsyncComponent } from 'vue'
import { programsStore } from '@/stores/programsStore'

export default defineComponent({
  components: {
    MyComputer: defineAsyncComponent(() => import('@/components/programs/MyComputer.vue')),
    NetworkNeighborhood: defineAsyncComponent(() => import('@/components/programs/NetworkNeightborhood.vue')),
    PAWDOS: defineAsyncComponent(() => import('@/components/programs/PAWDOS.vue')),
    Paint: defineAsyncComponent(() => import('@/components/programs/paint/Paint.vue')),
    Minesweeper: defineAsyncComponent(() => import('@/components/programs/minesweeper/MinesweeperGame.vue')),
    Calculator: defineAsyncComponent(() => import('@/components/programs/Calculator.vue')),
    PCSettings: defineAsyncComponent(() => import('@/components/programs/pc-settings/PCSettings.vue')),
    PawPoint: defineAsyncComponent(() => import('@/components/programs/pawpoint/PawPoint.vue')),
    AddOrRemovePrograms: defineAsyncComponent(() => import('@/components/programs/add-remove-programs/AddOrRemovePrograms.vue')),
    Chattie: defineAsyncComponent(() => import('@/components/programs/chattie/Chattie.vue')),
    PawPlayer: defineAsyncComponent(() => import('@/components/programs/paw-player/PawPlayer.vue')),
    PawExplore: defineAsyncComponent(() => import('@/components/programs/paw-explore/PawExplore.vue')),
    ErrorComponent: defineAsyncComponent(() => import('@/components/ErrorComponent.vue'))
  },

  setup() {
    const programsstore = programsStore()

    const activePrograms = computed(() => programsstore.activePrograms)

    return {
      activePrograms
    }
  }
})
</script>