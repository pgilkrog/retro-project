<template lang="pug">
.active-slide.h-100.d-flex.bg-primary.m-4.flex-column.justify-content-center.text-white.pointer
  .title.d-flex.justify-content-center.align-items-center.my-4(v-if="props.title !== undefined && props.title !== ''")
    h1 {{ props.title }}
  .text.d-flex.justify-content-center.align-items-center(v-if="props.image !== undefined && props.image !== ''")
    img.reponsive-img.p-4(:src="image")
</template>
<script setup lang="ts">
const props = defineProps({
  title: String,
  image: String
})
</script>
<style lang="sass">
img 
  max-width: 1000px
</style>