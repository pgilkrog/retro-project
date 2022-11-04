<template lang="pug">
WindowFrame(:program="program")
</template>

<script lang="ts">
import { IProgram } from '@/models/IProgram'
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