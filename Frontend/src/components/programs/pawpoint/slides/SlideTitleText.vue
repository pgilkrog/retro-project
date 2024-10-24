<template lang="pug">
.title(v-if="slide.title !== undefined && slide.title !== ''" class="d-flex justify-center items-center my-4")
  h1 {{ slide.title }}
.text(v-if="slide.text !== undefined && slide.text !== ''" class="d-flex justify-center items-center")
  h3(v-html="slide.text")
</template>
<script setup lang="ts">
import type { ISlide } from '@/models'

const { slide } = defineProps<{
  slide: ISlide
}>()
</script>
