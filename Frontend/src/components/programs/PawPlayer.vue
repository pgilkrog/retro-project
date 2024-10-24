<template lang="pug">
WindowFrame(:program="program")
  .paw-player
    .display.bg-light
      iframe(
        height="500"
        width="800"
        src="https://www.youtube.com/embed/jfswIdiiQhU"
        frameborder="0" 
        title="YouTube video player" 
        allowfullscreen
        allow="autoplay; encrypted-media"
      )
    .buttons.bg-shadow.d-flex
      ButtonComponent(icon="fa-circle-play")
</template>
<script setup lang="ts">
import type { IProgram } from '@/models/index'

const { program } = defineProps<{
  program: IProgram
}>()

const videoUrl = 'https://www.youtube.com/embed/Hmyn67dWBe4'
</script>
<style scoped lang="sass">
.display
  width: 800px
  height: 500px
</style>
