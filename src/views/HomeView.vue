<template lang="pug">
.home-wrapper.bg-fill.p-4
  .desktop-container
    DesktopItem(
      v-for="(program, index) in allPrograms"
      v-on:generateComponent="generateComponent(program)"
      :key="index"
      :program="program"
      :itemColor="program.Color"
    )
  Component(
    v-for="(program, index) in activePrograms"
    v-on:closeWindow="closeWindow(program.Name)"
    :key="index"
    :id="program.Name"
    :is="program.Name"
    :program="program"
  )
  //- PingPong
</template>

<script lang="ts">
import type { IProgram } from '@/models/IProgram'
import { defineComponent, computed } from 'vue'

import DesktopItem from '@/components/DesktopItem.vue'
import MyComputer from '@/components/programs/MyComputer.vue'
import NetworkNeighborhood from '@/components/programs/NetworkNeightborhood.vue'
import MSDOS from '@/components/programs/MSDOS.vue'
import PawVania from '@/phaser/first-game/components/Game.vue'
import Platformer from '@/phaser/platformer-game/components/Game.vue'
import Paint from '@/components/programs/Paint.vue'
import Calculator from '@/components/programs/Calculator.vue'
import Minesweeper from '@/components/programs/minesweeper/MinesweeperGame.vue'

import { programsStore } from '@/stores/programsStore'

export default defineComponent({
  components: {
    DesktopItem,
    MyComputer,
    NetworkNeighborhood,
    MSDOS,
    Paint,
    PawVania,
    Platformer,
    Minesweeper,
    Calculator
  },
  props: {

  },
  data() {
    return {
      programsstore: programsStore(),
      activePrograms: {},
      allPrograms: {}
    }
  },
  methods: {
    generateComponent(program: IProgram) {
      this.programsstore.addProgramToActive(program)
    },
  },
  mounted() {
    this.activePrograms = computed(() => this.programsstore.getActivePrograms as IProgram[])
    this.allPrograms = computed(() => this.programsstore.getPrograms as IProgram[])
  }
})
</script>