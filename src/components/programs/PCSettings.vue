<template lang="pug">
WindowFrame(:program="program" :isMoveable="true")
  .pc-settings-wrapper.p-4
    input(type="file" @change="onFileSelected")
</template>

<script lang="ts">
import WindowFrame from '../WindowFrame.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  components: {
    WindowFrame
  },
  props: {
    program: Object
  },
  methods: {
    
  }
})
</script>