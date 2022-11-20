<template lang="pug">
.home-wrapper.bg-fill
  .desktop-container
    DesktopItem(
      v-for="(program, index) in allPrograms"
      :key="index"
      :program="program"
      v-on:generateComponent="generateComponent(program)"
      :itemColor="program.Color"
    )
  Component(
    v-for="(component, index) in activePrograms"
    :key="index"
    :id="component.Name"
    :is="component.Name"
    v-on:closeWindow="closeWindow(component.Name)"
    :program="component"
  )
  //- Game
</template>

<script lang="ts">
import type { IProgram } from '@/models/IProgram'
import { defineComponent, computed } from 'vue'

import DesktopItem from '@/components/DesktopItem.vue'
import MyComputer from '@/components/programs/MyComputer.vue'
import NetworkNeighborhood from '@/components/programs/NetworkNeightborhood.vue'
import MSDOS from '@/components/programs/MSDOS.vue'
import FlappyDisk from '@/phaser/flappy-disk/components/Game.vue'
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
    FlappyDisk,
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
      allPrograms: [] as IProgram[]
    }
  },
  methods: {
    generateComponent(program: IProgram) {
      this.programsstore.addProgramToActive(program)
    },
  },
  mounted() {
    this.activePrograms = computed(() => this.programsstore.getActivePrograms as IProgram[])
    this.allPrograms = this.programsstore.getPrograms
  }
})
</script>