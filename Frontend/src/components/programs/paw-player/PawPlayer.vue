<template lang="pug">
WindowFrame(:program="props.program")
  .paw-player
    .display.bg-light
      iframe(
        height="500"
        width="800"
        src="https://www.youtube.com/embed/jfswIdiiQhU"
        frameborder="0" 
        title="YouTube video player" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share;" 
        allowfullscreen
      )
    .buttons.bg-shadow.d-flex
      button.btn
        IconComponent(name="fa-circle-play" variant="dark" size="24")

</template>
<script setup lang="ts">
const props = defineProps({
  program: Object
})

const videoUrl = "https://www.youtube.com/embed/Hmyn67dWBe4"

</script>
<style lang="sass">
.display
  width: 800px
  height: 500px
</style>