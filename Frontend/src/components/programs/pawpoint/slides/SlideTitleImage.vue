<template lang="pug">
.title.d-flex.justify-content-center.align-items-center.my-4
  h1 {{ slide.title }}
.text.d-flex.justify-content-center.align-items-center()
  ImageComponent(:id="slide.id.toString()" :source="slide.image" alt="image of things" )
</template>
<script setup lang="ts">
import type { ISlide } from '@/models'

const { slide } = defineProps<{
  slide: ISlide
}>()
</script>
<style scoped lang="sass">
img
  max-width: 1000px
</style>
