<template>
  <div
    ref="gameContainer"
    class="game-container"
  />
</template>

<script setup lang="ts">
import Phaser from 'phaser'

import Game from './scenes/Game'
import Loader from './scenes/Loader'
import Apartment1 from './scenes/apartments/Apartment1_Scene'
import type { IConfig } from './interfaces/IConfig'
import UIScene from './scenes/ui/UI'

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

const Scenes = [Loader, Game, Apartment1, UIScene]
const createScene = (Scene: any) => new Scene(SHARED_CONFIG)
const initScenes = () => Scenes.map(createScene)

onMounted(() => {
  new Phaser.Game({
    type: Phaser.AUTO,
    ...SHARED_CONFIG,
    pixelArt: true,
    parent: gameContainer.value,
    physics: {
      default: 'arcade',
      arcade: {
        debug: false,
      },
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
