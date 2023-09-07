<template lang="pug">
.active-slide.h-100.d-flex.bg-primary.m-4.flex-column.justify-content-center.text-white.pointer
  .title.d-flex.justify-content-center.align-items-center.my-4(v-if="title !== undefined && title !== ''")
    h1 {{ title }}
  .text.d-flex.justify-content-center.align-items-center(v-if="image !== undefined && image !== ''")
    img.reponsive-img.p-4(:src="image")
</template>
<script setup lang="ts">

const { title, image } = defineProps({
  title: String,
  image: String
})
</script>
<style lang="sass">
img 
  max-width: 1000px
</style>