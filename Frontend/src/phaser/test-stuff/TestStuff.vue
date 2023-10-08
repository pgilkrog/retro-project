<template lang="pug">
div(ref="gameContainer" class="game-container")
</template>

<script lang="ts">
import Phaser from 'phaser'
import Loader from './scenes/Loader'
import GameScene from './scenes/inventory/GameScene'
import { defineComponent, ref, onMounted } from 'vue'
export interface IConfig {
  mapOffset: number,
  width: number,
  height: number,
  zoomFactor: number
}
export default defineComponent ({
  name: 'GameComponent',
  setup() {
    const gameContainer = ref<HTMLDivElement>()    
    const MAP_WIDTH = 32*100
    const WIDTH = document.body.offsetWidth
    const HEIGHT = 32*100
    const SHARED_CONFIG = {
      mapOffset: MAP_WIDTH > WIDTH ? MAP_WIDTH - WIDTH : 0,
      width: WIDTH,
      height: HEIGHT,
      zoomFactor: 1
    } as IConfig

    onMounted(() => {
      new Phaser.Game({
        type: Phaser.AUTO,
        ...SHARED_CONFIG,
        pixelArt: true,
        parent: gameContainer.value,
        physics: {
          default: 'arcade',
          arcade: {
            debug: true
          }
        },
        scale: {
          parent: gameContainer.value,
          mode: Phaser.Scale.FIT,
          autoCenter: Phaser.Scale.CENTER_BOTH,
          width: '100%',
          height: '100%',
          fullscreenTarget: 'body'
        },
        scene: [Loader, GameScene]
      })
    })

    return {
      gameContainer
    }
  }
})
</script>./scenes/inventory/GameScene