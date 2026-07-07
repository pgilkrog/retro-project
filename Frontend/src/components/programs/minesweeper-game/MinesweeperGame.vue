<template>
  <WindowFrame
    :program="program"
    :is-moveable="true"
  >
    <div class="minesweeper-wrapper">
      <div class="topbar" />
      <div class="game-wrapper">
        <MinesweeperBlock
          v-for="(item, index) in grid"
          :key="index"
          :block="item"
          @click="clickedBlock(item, index)"
        />
      </div>
    </div>
  </WindowFrame>
</template>

<script setup lang="ts">
import type { IProgram } from '@/models'
import MinesweeperBlock from './minesweeper/MinesweeperBlock.vue'

const { program } = defineProps<{
  program: IProgram
}>()

const grid = ref<object[]>([])
const rows = ref(10)
const columns = ref(5)
// const bombs = ref(10)
// const gameOver = ref(false)

onMounted(() => {
  generateBlocks()
})

const clickedBlock = (block: { isClicked: boolean }, index: number) => {
  block.isClicked = true
  console.log(index)
}
const generateBlocks = () => {
  for (let i = 0; i < rows.value * columns.value; i++) {
    grid.value.push({ index: i, isClicked: false, isBomb: false })
  }
}
</script>
