<template>
  <div
    ref="gameContainer"
    class="game-container"
  />
</template>

<script setup lang="ts">
import Phaser from 'phaser'

import Create from './scenes/Create'
import Loader from './scenes/Loader'
import Menu from './scenes/Menu'
import Score from './scenes/Score'
import Pause from './scenes/Pause'

const gameContainer = ref<HTMLDivElement>()

onMounted(() => {
  new Phaser.Game({
    type: Phaser.AUTO,
    width: '2800',
    height: '600',
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
      width: 800,
      height: 600,
    },
    scene: [Loader, Create, Menu, Score, Pause],
  })
})
</script>
