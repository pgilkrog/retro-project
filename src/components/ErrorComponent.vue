<template lang="pug">
WindowFrame
  .error-component
</template>

<script lang="ts">
import WindowFrame from './WindowFrame.vue'
export default {
  props: {
    text: String,
    variant: String
  },
  components: {
    WindowFrame
  }
}
</script>