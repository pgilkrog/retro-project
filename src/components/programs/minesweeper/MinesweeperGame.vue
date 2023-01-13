<template lang="pug">
WindowFrame(:program="program")
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

<script lang="ts">
import WindowFrame from '../../WindowFrame.vue'
import MinesweeperBlock from './MinesweeperBlock.vue'

export default  {
  props: {
    program: Object
  },
  components: {
    WindowFrame,
    MinesweeperBlock
  },
  data() {
    return {
      grid: [] as Object[],
      rows: 10,
      columns:  5,
      bombs: 10
    }
  },
  mounted() {
    this.generateBlocks()
  },
  methods: {
    clickedBlock(block: any, index: any) {
      block.isClicked = true
    },
    generateBlocks() {
      for(let i = 0; i < (this.rows * this.columns); i++) {
        this.grid.push({ index: i, isClicked: false, isBomb: false })
      }
    }
  }
}
</script>