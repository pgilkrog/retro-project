<template lang="pug">
WindowFrame(title="Network Neighborhood" v-on:closeWindow="closeWindow")
</template>

<script lang="ts">
import WindowFrame from '../WindowFrame.vue';

export default {
  components: {
    WindowFrame
  },
  methods: {
    closeWindow() {
      this.$emit('closeWindow', "NetworkNeighborhood")
    }
  }
}
</script>