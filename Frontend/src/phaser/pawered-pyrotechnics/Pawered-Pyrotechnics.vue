<template>
  <div
    ref="gameContainer"
    class="game-container bg-emerald-700"
  />
</template>

<script setup lang="ts">
import Phaser from 'phaser'
import Loader from './scenes/loader'
import GameScene from './scenes/game'
import MainMenu from './scenes/mainMenu'

export interface IConfig {
  mapOffset: number
  width: number
  height: number
  zoomFactor: number
}

const gameContainer = ref<HTMLDivElement>()
const MAP_WIDTH = 64 * 15
const WIDTH = document.body.offsetWidth
const HEIGHT = 64 * 15
const SHARED_CONFIG = {
  mapOffset: MAP_WIDTH > WIDTH ? MAP_WIDTH - WIDTH : 0,
  width: WIDTH,
  height: HEIGHT,
  zoomFactor: 1,
} as IConfig

onMounted(() => {
  new Phaser.Game({
    type: Phaser.AUTO,
    pixelArt: true,
    parent: gameContainer.value,
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { x: 0, y: 0 },
        debug: true,
      },
    },
    scale: {
      parent: gameContainer.value,
      width: 960,
      height: 832,
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
      fullscreenTarget: 'body',
    },
    scene: [Loader, GameScene, MainMenu],
    audio: {
      disableWebAudio: false,
    },
  })
})
</script>
