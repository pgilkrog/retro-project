<template lang="pug">
img(v-if="imageIsLoading === false" :src="src" :class="fadeInClass")
p(v-else) LOADING!!
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

const { source = '', alt } = defineProps({
  source: String, 
  alt: String
})

const imageIsLoading = ref(true)
const src = ref('')
const fadeInClass = ref('fade-in-image')

onMounted(async () => {
  const image = new Image()
  if (source === undefined) return
  image.src = source + ''
  await new Promise(resolve => (image.onload = resolve))
  src.value = image.src
  imageIsLoading.value = false
  setTimeout(() => fadeInClass.value = 'fade-in-image visible', 10)
})
</script>
<style scoped>

.fade-in-image {
  opacity: 0;
  transition: opacity 0.5s ease; 
}

.fade-in-image.visible {
  opacity: 1;
}
</style>