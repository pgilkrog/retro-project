<template lang="pug">
div(id="containerId")
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted } from 'vue'

const containerId = 'game-container'
const game = await import('@/phaser/flappy-disk/main')
let gameInstance: any = null

onMounted(() => {
  gameInstance = game.launch(containerId)
})
onUnmounted(() => {
  gameInstance.destroy(false)
})
</script>