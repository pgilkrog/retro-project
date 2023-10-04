<template lang="pug">
div(ref="gameContainer" class="game-container")
</template>

<script lang="ts">
import Phaser from 'phaser'
import Loader from './scenes/Loader'
import GameScene from './scenes/inventory/GameScene'
import { defineComponent, ref, onMounted } from 'vue'

export default defineComponent ({
  name: 'GameComponent',
  setup() {
    const gameContainer = ref<HTMLDivElement>()

    onMounted(() => {
      new Phaser.Game({
        type: Phaser.AUTO,
        width: "800",
        height: "600",
        pixelArt: true,
        parent: gameContainer.value,
        physics: {
          default: "arcade",
          arcade: {
            debug: true
          }
        },
        scale: {
            parent: gameContainer.value,
            mode: Phaser.Scale.FIT,
            autoCenter: Phaser.Scale.CENTER_BOTH,
            width: 800,
            height: 600
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