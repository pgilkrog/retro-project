<template>
  <WindowFrame :program="program">
    <div class="paw-player">
      <div class="h-[500px] w-[800px] bg-gray-50">
        <iframe
          height="500"
          width="800"
          :src="videoUrl"
          frameborder="0"
          title="YouTube video player"
          allowfullscreen
          allow="autoplay; encrypted-media"
        />
      </div>
      <div class="buttons bg-shadow d-flex">
        <ButtonComponent icon="fa-circle-play" />
      </div>
    </div>
  </WindowFrame>
</template>
<script setup lang="ts">
import type { IProgram } from '@/models'

defineProps<{
  program: IProgram
}>()

const videoUrl = 'https://www.youtube.com/embed/cmDgfzpKw5w?si=77DhjPiK0eb2A5f4'
</script>
