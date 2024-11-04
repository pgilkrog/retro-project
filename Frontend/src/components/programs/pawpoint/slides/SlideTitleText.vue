<template lang="pug">
.title( class="d-flex justify-center items-center my-4")
  h1 {{ slide.title }} 
.text( class="d-flex justify-center items-center")
  h3(v-html="slide.text")
</template>
<script setup lang="ts">
import type { ISlide } from '@/models'

const { slide } = defineProps<{
  slide: ISlide
}>()
</script>
