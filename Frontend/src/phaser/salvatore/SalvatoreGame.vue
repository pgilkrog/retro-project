<template lang="pug">
div(ref="gameContainer" class="game-container")
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import Phaser from 'phaser'

import Game from './scenes/Game'
import Loader from './scenes/Loader'
import Apartment1 from './scenes/apartments/Apartment1_Scene'
import SceneManager from './utils/SceneManager'

export default defineComponent({
  name: 'SalvatoreGame',
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
    }

    const Scenes = [Loader, Game, Apartment1]
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
            debug: false
          }
        },
        scale: {
          parent: gameContainer.value,
          mode: Phaser.Scale.FIT,
          autoCenter: Phaser.Scale.CENTER_BOTH,
          width: '100%',
          height: '100%'
        },
        scene: initScenes()
      })
    })
    
    return {
      
    }
  }
})
</script>

<style lang="sass" scoped>
</style>