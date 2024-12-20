<template>
  <img
    v-if="imageIsLoading === false && src !== ''"
    :id
    :src
    :alt
    :class="fadeInClass"
  />
  <div
    v-else
    class="bg-gray-200 rounded flex justify-center items-center border border-gray-900 h-[200px] w-[200px]"
    role="img"
    :aria-label="alt"
  >
    <iconComponent
      :name="imageIsLoading === true ? 'fa-spinner' : 'bi-image'"
      :class="imageIsLoading === true ? 'animate-spin' : ''"
      color="dark"
      size="34"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const imageIsLoading = ref(true)
const src = ref('')
const fadeInClass = ref('fade-in-image')

const {
  id,
  source,
  alt = '',
} = defineProps<{
  id: string
  source: string
  alt?: string
}>()

onMounted(() => {
  if (!source) {
    // Handle case where source is not provided
    imageIsLoading.value = false
    return
  }

  const image = new Image()
  image.src = source

  image.onload = () => {
    src.value = image.src
    imageIsLoading.value = false
    setTimeout(() => (fadeInClass.value = 'fade-in-image visible'), 10)
  }

  image.onerror = () => {
    // Handle case where the image fails to load (invalid source)
    imageIsLoading.value = false
    console.error('Error loading image:', source)
  }
})
</script>

<style scoped lang="sass">
.fade-in-image
  transition: opacity 0.5s ease
  opacity: 0

.fade-in-image.visible
  opacity: 1
</style>
