<template lang="pug">
WindowFrame(:program="program" :isMoveable="true")
  .minesweeper-wrapper 
    .topbar 
    .game-wrapper
      MinesweeperBlock(
        v-for="(item, index) in grid" 
        :key="index" 
        :Block="item"
        @click="clickedBlock(item, index)"
      )
</template>

<script setup lang="ts">
import MinesweeperBlock from './minesweeper/MinesweeperBlock.vue'

const { program } = defineProps({
  program: Object
})

const grid = ref([] as Object[])
const rows = ref(10)
const columns = ref(5)
const bombs = ref(10)
const gameOver = ref(false)

onMounted (() => {
  generateBlocks()
})

const clickedBlock = (block: any, index: any) => {
  block.isClicked = true
}
const generateBlocks = () => {
  for(let i = 0; i < (rows.value * columns.value); i++) {
    grid.value.push({ index: i, isClicked: false, isBomb: false })
  }
}
</script>