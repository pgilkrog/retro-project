<template lang="pug">
div(ref="gameContainer" class="game-container")
</template>

<script lang="ts">
import Phaser from 'phaser'
import { defineComponent, ref, onMounted } from 'vue'

import Create from './scenes/Create'
import Loader from './scenes/Loader'
import Menu from './scenes/Menu'
import Score from './scenes/Score'
import Pause from './scenes/Pause'

export default defineComponent ({
  name: 'GameComponent',
  setup() {
    const gameContainer = ref<HTMLDivElement>()

    onMounted(() => {
      new Phaser.Game({
        type: Phaser.AUTO,
        width: "2800",
        height: "600",
        pixelArt: true,
        parent: gameContainer.value,
        physics: {
            default: "arcade",
            arcade: {
                debug: false
            }
        },
        scale: {
            parent: gameContainer.value,
            mode: Phaser.Scale.FIT,
            autoCenter: Phaser.Scale.CENTER_BOTH,
            width: 800,
            height: 600
        },
        scene: [Loader, Create, Menu, Score, Pause]
      })
    })

    return {
      gameContainer
    }
  }
})
</script>