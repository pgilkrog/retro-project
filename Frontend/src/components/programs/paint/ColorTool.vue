<template lang="pug">
.color-wrapper(class="grid grid-cols-4")
  .color-item(
    v-for="color in colors"
    :key="color"
    class="bg-shadow-inner h-12 w-12"
    @click="changeColor(color)"
    :style="'background: '+ color"
  ) 
</template>

<script setup lang="ts">

const emit = defineEmits<{
  (e: 'changeColor', color: string): void
}>()

const colors = ref([
  '#0000ff',
  '#00ff00',
  '#ff0000',
  '#ffff00',
  '#00ffff',
  '#ff00ff',
  '#ffffff',
  '#000000',
  '#f0f0f0',
  '#0ff00f',
  '#1ef0ae'
] as string[])

const changeColor = (color: string) => {
  emit('changeColor', color)
}

</script>
