<template lang="pug">
img(
  v-if="imageIsLoading === false && src !== ''" 
  :src 
  :alt 
)
div.rounded.d-flex.justify-content-center.align-items-center.border.border-dark(v-else role="img" :aria-label="alt" style="height: 200px; width: 200px; background: #eeeeee;") 
  iconComponent(name="bi-image" variant="dark" size="34")
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
  
  if (!source) {
    // Handle case where source is not provided
    imageIsLoading.value = false
    return
  }

  image.src = source + ''
  image.onload = () => {
    src.value = image.src
    imageIsLoading.value = false
    setTimeout(() => fadeInClass.value = 'fade-in-image visible', 10)
  }

  image.onerror = () => {
    // Handle case where the image fails to load (invalid source)
    imageIsLoading.value = false
    console.error('Error loading image:', source)
  }
})
</script>

<style scoped>
.fade-in-image {
  opacity: 0;
  transition: opacity 0.5s ease; 
}

.fade-in-image.visible {
  opacity: 1
}
</style>