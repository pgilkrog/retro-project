<template>
  <div
    ref="gameContainer"
    class="game-container"
  />
</template>

<script setup lang="ts">
import Phaser from 'phaser'
import Loader from './scenes/Loader'
import GameScene from './scenes/Game'

export interface IConfig {
  mapOffset: number
  width: number
  height: number
  zoomFactor: number
}

const gameContainer = ref<HTMLDivElement | null>(null)
let game: Phaser.Game | null = null

const BASE_WIDTH = window.innerWidth
const BASE_HEIGHT = window.innerHeight

const SHARED_CONFIG = {
  mapOffset: 0,
  width: BASE_WIDTH,
  height: BASE_HEIGHT,
  zoomFactor: 1,
} as IConfig

const createGame = () => {
  const container = gameContainer.value

  if (!container) {
    return
  }

  game = new Phaser.Game({
    type: Phaser.AUTO,
    ...SHARED_CONFIG,
    pixelArt: true,
    parent: gameContainer.value,
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { x: 0, y: 0 },
        debug: false,
      },
    },
    scale: {
      parent: container,
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
      width: BASE_WIDTH,
      height: BASE_HEIGHT,
      fullscreenTarget: 'body',
    },
    scene: [Loader, GameScene],
    audio: {
      disableWebAudio: false,
    },
  })
}

onMounted(() => {
  createGame()
})

onBeforeUnmount(() => {
  game?.destroy(true)
})
</script>
