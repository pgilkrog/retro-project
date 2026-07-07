<template>
  <div class="title flex justify-center items-center my-4">
    <h1>
      {{ slide.title }}
    </h1>
  </div>
  <div class="text flex justify-center items-center">
    <h3 v-html="slide.text" />
  </div>
</template>
<script setup lang="ts">
import type { ISlide } from '@/models'

const { slide } = defineProps<{
  slide: ISlide
}>()
</script>
