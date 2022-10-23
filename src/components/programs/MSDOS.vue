<template lang="pug">
WindowFrame(title="MS-DOS" v-on:closeWindow="closeWindow" image="https://win98icons.alexmeub.com/icons/png/ms_dos-1.png")
  .bg-black.text-white
    p HEJSA
</template>

<script lang="ts">
import WindowFrame from '../WindowFrame.vue';

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