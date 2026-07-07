<template>
  <div class="color-wrapper grid grid-cols-4">
    <div
      v-for="color in colors"
      :key="color"
      class="bg-shadow-inner h-12 w-12"
      @click="changeColor(color)"
      :style="'background: ' + color"
    />
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  changeColor: [color: string]
}>()

const colors: string[] = [
  '#0000ff', // Blue
  '#00ff00', // Lime
  '#ff0000', // Red
  '#ffff00', // Yellow
  '#00ffff', // Cyan
  '#ff00ff', // Magenta
  '#ffffff', // White
  '#000000', // Black
  '#f0f0f0', // Light Gray
  '#0ff00f', // Bright Green
  '#1ef0ae', // Aqua Green
]

const changeColor = (color: string) => {
  emit('changeColor', color)
}
</script>
