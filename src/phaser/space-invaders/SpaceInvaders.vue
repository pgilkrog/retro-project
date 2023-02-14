<template lang="pug">
div(ref="gameContainer" class="game-container")
</template>

<script lang="ts">
import Phaser from 'phaser'
import Loader from './scenes/Loader'
import GameScene from './scenes/Game'
import { defineComponent, ref, onMounted } from 'vue'

export default defineComponent({
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
          default: "arcade"
        },
        scale: {
          mode: Phaser.Scale.FIT,
          autoCenter: Phaser.Scale.CENTER_BOTH,
          width: 800,
          height: 600,
          parent: gameContainer.value
        },
        scene: [Loader, GameScene]
      })
    })

    return {
      gameContainer
    }
  }
})
</script>