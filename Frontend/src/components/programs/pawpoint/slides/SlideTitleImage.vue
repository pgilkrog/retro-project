<template lang="pug">
.title.d-flex.justify-content-center.align-items-center.my-4(v-if="slide.title !== undefined && slide.title !== ''")
  h1 {{ slide.title }}
.text.d-flex.justify-content-center.align-items-center(v-if="slide.image !== undefined && slide.image !== ''")
  ImageComponent(:id="slideTitleImage" :source="slide.image" alt="image of things")
</template>
<script setup lang="ts"> 

const { slide } = defineProps({
  slide: Object
})

</script>
<style lang="sass">
img 
  max-width: 1000px
</style>