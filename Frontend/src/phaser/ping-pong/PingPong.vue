<template>
  <div class="game-container h-full w-full">
    <div class="flex flex-col items-center">
      <div class="bg-shadow p-8 fit-content rounded bg-gray-300">
        <div class="bg-shadow-inner img-box bg-gray-300">
          <div ref="gameContainer" />
        </div>
      </div>
      <div class="square-1 bg-shadow bg-gray-300 rounded-bottom h-[20px] w-[450px]" />
      <div class="square-2 bg-shadow bg-gray-300 h-[30px] w-[320px]" />
      <div class="square-3 bg-shadow bg-gray-300 rounded-top h-[15px] w-[650px]" />
    </div>
  </div>
</template>

<script setup lang="ts">
import Phaser from 'phaser'
import Loader from './scenes/Loader'
import GameScene from './scenes/GameScene'
import { ref } from 'vue'

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
