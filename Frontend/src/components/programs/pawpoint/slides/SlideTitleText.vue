<template lang="pug">
.active-slide.h-100.d-flex.bg-primary.m-4.flex-column.justify-content-center.text-white.pointer
  .title.d-flex.justify-content-center.align-items-center.my-4(v-if="title !== undefined && title !== ''")
    h1 {{ title }}
  .text.d-flex.justify-content-center.align-items-center(v-if="text !== undefined && text !== ''")
    h3(v-html="text")
</template>
<script setup lang="ts">
const { title, text } = defineProps({
  title: String,
  text: String
})
</script>