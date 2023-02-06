<template lang="pug">
Component(
  v-for="(program, index) in activePrograms"
  v-on:closeWindow="closeWindow(program.Name)"
  :key="index"
  :id="program.Name"
  :is="program.Name"
  :program="program"
)
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { IProgram } from '@/models/index'
import { programsStore } from '@/stores/programsStore'

// Components
import MyComputer from '@/components/programs/MyComputer.vue'
import NetworkNeighborhood from '@/components/programs/NetworkNeightborhood.vue'
import PAWDOS from '@/components/programs/PAWDOS.vue'
import PawVania from '@/phaser/first-game/components/Game.vue'
import Platformer from '@/phaser/platformer-game/components/Game.vue'
import Paint from '@/components/programs/Paint.vue'
import Calculator from '@/components/programs/Calculator.vue'
import Minesweeper from '@/components/programs/minesweeper/MinesweeperGame.vue'

export default defineComponent({
  components: {
    MyComputer,
    NetworkNeighborhood,
    PAWDOS,
    Paint,
    PawVania,
    Platformer,
    Minesweeper,
    Calculator
  },
  data() {
    return {
      programsstore: programsStore()
    }
  },
  computed: {
    activePrograms(): IProgram[] {
      return this.programsstore.getActivePrograms
    }
  }
})
</script>