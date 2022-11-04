<template lang="pug">
WindowFrame(:program="program")
  .bg-black.text-white
    p HEJSA
</template>

<script lang="ts">
import WindowFrame from '../WindowFrame.vue'

export default {
  components: {
    WindowFrame
  },
  methods: {
    closeWindow() {
      this.$emit('closeWindow', 'NetworkNeighborhood')
    }
  }
}
</script>