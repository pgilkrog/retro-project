<template lang="pug">
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
import type { PropType } from 'vue'
import type { IProgram } from '@/models/index'

const { program } = defineProps({
  program: Object as PropType<IProgram>
})

const videoUrl = "https://www.youtube.com/embed/Hmyn67dWBe4"

</script>
<style lang="sass">
.display
  width: 800px
  height: 500px
</style>