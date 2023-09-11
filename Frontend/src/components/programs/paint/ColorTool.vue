<template lang="pug">
.color-wrapper.mt-4
  .d-flex.flex-wrap
    div.btn.btn-color.bg-shadow-inner(
      v-for="(color, index) in colors"
      :key="index"
      @click="changeColor(color)"
      :style="'background: '+ color"
    ) 
</template>

<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits([
  'changeColor'
])

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
