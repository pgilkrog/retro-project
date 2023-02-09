<template lang="pug">
.color-wrapper.mt-4
  .d-flex.flex-wrap
    button.btn.btn-color.bg-shadow-inner(
      v-for="(color, index) in colors"
      :key="index"
      @click="changeColor(color)"
      :style="'background: '+ color"
    ) 
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  data() {
    return {
      colors: [
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
      ] as string[],
    }
  },
  methods: {
    changeColor(color: string) {
      this.$emit('changeColor', color)
    }
  }
})
</script>
