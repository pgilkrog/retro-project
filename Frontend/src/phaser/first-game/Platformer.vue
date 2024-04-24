<template lang="pug">
div(ref="gameContainer" class="game-container")
</template>

<script lang="ts">
import Phaser from 'phaser'
import { defineComponent, ref } from 'vue'

import BootScene from '@/phaser/first-game/scenes/Loader'
import PlayScene from '@/phaser/first-game/scenes/Game'
import GameOver from '@/phaser/first-game/scenes/GameOver'
import SelectCharacterScene from '@/phaser/first-game/scenes/SelectCharacterScene'

import UI from '@/phaser/first-game/scenes/UI'

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
    } 

    onMounted(() => {
      console.log("DID THIS RUN")
      new Phaser.Game({
        type: Phaser.AUTO,
        ...SHARED_CONFIG,
        pixelArt: true,
        parent: gameContainer.value,
        physics: {
          default: "matter",
          matter: {
          debug: false,
            setBounds: { 
              left: true,
              right: true,
              top: true,
              bottom: true
            }
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
        scene: [BootScene, SelectCharacterScene, PlayScene, UI, GameOver]
      })
    })

    return {
      gameContainer
    }
  }
})
</script>