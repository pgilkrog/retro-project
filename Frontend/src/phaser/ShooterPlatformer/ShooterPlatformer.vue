<template>
  <div
    ref="gameContainer"
    class="game-container"
  />
</template>

<script setup lang="ts">
import Phaser from 'phaser'
import { onBeforeUnmount, onMounted, ref } from 'vue'

import Loader from './scenes/loader'
import Game from './scenes/Game'
import UI from './scenes/UI'
import DialogScene from './Dialog/DialogScene'

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

const SHARED_CONFIG: IConfig = {
  mapOffset: 0,
  width: BASE_WIDTH,
  height: BASE_HEIGHT,
  zoomFactor: 1,
}

const Scenes = [Loader, Game, UI, DialogScene]
const createScene = (Scene: any) => new Scene(SHARED_CONFIG)
const initScenes = () => Scenes.map(createScene)

const createGame = () => {
  const container = gameContainer.value

  if (!container) {
    return
  }

  game = new Phaser.Game({
    type: Phaser.AUTO,
    ...SHARED_CONFIG,
    pixelArt: true,
    parent: container,
    physics: {
      default: 'matter',
      matter: { debug: false },
    },
    scale: {
      parent: container,
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
      width: BASE_WIDTH,
      height: BASE_HEIGHT,
      fullscreenTarget: 'body',
    },
    scene: initScenes(),
  })
}

onMounted(() => {
  createGame()
})

onBeforeUnmount(() => {
  game?.destroy(true)
})
</script>
