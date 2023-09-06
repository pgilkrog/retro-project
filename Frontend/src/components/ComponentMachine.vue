<template lang="pug">
Component(
  v-for="(program, index) in activePrograms"
  :key="index"
  :is="program.name"
  :program="program"
)
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { programsStore } from '@/stores/programsStore'

// Components
import MyComputer from '@/components/programs/MyComputer.vue'
import NetworkNeighborhood from '@/components/programs/NetworkNeightborhood.vue'
import PAWDOS from '@/components/programs/PAWDOS.vue'
import Paint from '@/components/programs/paint/Paint.vue'
import Calculator from '@/components/programs/Calculator.vue'
import Minesweeper from '@/components/programs/minesweeper/MinesweeperGame.vue'
import PCSettings from '@/components/programs/pc-settings/PCSettings.vue'
import PawPoint from '@/components/programs/pawpoint/PawPoint.vue'
import AddOrRemovePrograms from '@/components/programs/add-remove-programs/AddOrRemovePrograms.vue'
import Chattie from '@/components/programs/chattie/Chattie.vue'
import PawPlayer from '@/components/programs/paw-player/PawPlayer.vue'
import PawExplore from '@/components/programs/paw-explore/PawExplore.vue'

export default defineComponent({
  components: {
    MyComputer,
    NetworkNeighborhood,
    PAWDOS,
    Paint,
    Minesweeper,
    Calculator,
    PCSettings,
    PawPoint,
    AddOrRemovePrograms,
    Chattie,
    PawPlayer,
    PawExplore
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