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
import PawPoint from '@/components/programs/PawPoint.vue'
import AddOrRemovePrograms from '@/components/programs/add-remove-programs/AddOrRemovePrograms.vue'

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
    AddOrRemovePrograms
  },
  setup() {
    const programsstore = programsStore()

    const activePrograms = computed(() => programsstore.getActivePrograms)

    return {
      activePrograms
    }
  }
})
</script>