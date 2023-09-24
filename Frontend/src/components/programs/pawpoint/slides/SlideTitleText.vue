<template lang="pug">
.title.d-flex.justify-content-center.align-items-center.my-4(v-if="slide.title !== undefined && slide.title !== ''")
  h1 {{ slide.title }}
.text.d-flex.justify-content-center.align-items-center(v-if="slide.text !== undefined && slide.text !== ''")
  h3(v-html="slide.text")
</template>
<script setup lang="ts">
const { slide } = defineProps({
  slide: Object
})
</script>