<template lang="pug">
.active-slide.h-100.d-flex.bg-primary.m-4.flex-column.justify-content-center.text-white.pointer
  .title.d-flex.justify-content-center.align-items-center.my-4(v-if="props.title !== undefined && props.title !== ''")
    h1 {{ props.title }}
  .text.d-flex.justify-content-center.align-items-center(v-if="props.text !== undefined && props.text !== ''")
    h3(v-html="props.text")
</template>
<script setup lang="ts">
const props = defineProps({
  title: String,
  text: String
})
</script>