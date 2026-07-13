<template>
  <ComputerScreen>
    <div ref="gameContainer" />
  </ComputerScreen>
</template>

<script setup lang="ts">
import Phaser from 'phaser'
import Loader from './scenes/Loader'
import GameScene from './scenes/GameScene'
import ComputerScreen from '@/components/ComputerScreen.vue'

const gameContainer = ref<HTMLDivElement>()

onMounted(() => {
  new Phaser.Game({
    type: Phaser.AUTO,
    width: '800',
    height: '600',
    pixelArt: true,
    parent: gameContainer.value,
    physics: {
      default: 'arcade',
    },
    scale: {
      parent: gameContainer.value,
      mode: Phaser.Scale.CENTER_BOTH,
      width: 800,
      height: 600,
    },
    scene: [Loader, GameScene],
  })
})
</script>
<style scoped lang="sass">
canvas
  display: block
  margin: auto
  width: 800
  height: 600
</style>
