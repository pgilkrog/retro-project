<template lang="pug">
div(ref="gameContainer" class="game-container")
</template>

<script lang="ts">
import Phaser from 'phaser'
import { defineComponent, ref, onMounted } from 'vue'

import BootScene from '@/phaser/first-game/scenes/Loader'
import PlayScene from '@/phaser/first-game/scenes/Game'
import GameOver from '@/phaser/first-game/scenes/GameOver'
import SelectCharacterScene from '@/phaser/first-game/scenes/SelectCharacterScene'

import UI from '@/phaser/first-game/scenes/UI'

export default defineComponent ({
  name: 'GameComponent',
  setup() {
    const gameContainer = ref<HTMLDivElement>()

    onMounted(() => {
      new Phaser.Game({
        type: Phaser.AUTO,
        width: "100%",
        height: "100%",
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