<template>
  <div
    ref="gameContainer"
    class="game-container"
  ></div>
</template>

<script setup lang="ts">
import Phaser from 'phaser'

import Loader from './scenes/loader'
import Game from './scenes/Game'
import UI from './scenes/UI'

export interface IConfig {
  mapOffset: number
  width: number
  height: number
  zoomFactor: number
}

const gameContainer = ref<HTMLDivElement>()
const MAP_WIDTH = 32 * 100
const WIDTH = document.body.offsetWidth
const HEIGHT = 32 * 100
const SHARED_CONFIG = {
  mapOffset: MAP_WIDTH > WIDTH ? MAP_WIDTH - WIDTH : 0,
  width: WIDTH,
  height: HEIGHT,
  zoomFactor: 1,
} as IConfig

const Scenes = [Loader, Game, UI]
const createScene = (Scene: any) => new Scene(SHARED_CONFIG)
const initScenes = () => Scenes.map(createScene)

onMounted(() => {
  new Phaser.Game({
    type: Phaser.AUTO,
    width: SHARED_CONFIG.width, // Fixed: Explicitly set width
    height: SHARED_CONFIG.height, // Fixed: Explicitly set height
    pixelArt: true,
    parent: gameContainer.value,
    physics: {
      default: 'matter',
      matter: { debug: true, setBounds: { left: true, right: true, top: true, bottom: true } },
    },
    scale: {
      parent: gameContainer.value,
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
      width: '100%',
      height: '100%',
      fullscreenTarget: 'body',
    },
    scene: initScenes(),
  })
})
</script>
