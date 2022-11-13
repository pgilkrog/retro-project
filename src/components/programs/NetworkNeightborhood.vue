<template lang="pug">
WindowFrame(:program="program")
</template>

<script lang="ts">
import WindowFrame from '../WindowFrame.vue'

export default {
  components: {
    WindowFrame
  },
  props: {
    program: Object
  }
}
</script>