<template lang="pug">
WindowFrame(:title="program.name" v-on:closeWindow="closeWindow")
  .paint-wrapper.row.gx-0
    .tools-container(style="width: 200px;")
    .bg-white.light-border(style="width: 500px; height: 500px;")

</template>

<script lang="ts">
import { defineComponent } from 'vue';
import WindowFrame from '../WindowFrame.vue';
import { IProgram } from '@/models/IProgram'

export default defineComponent({
  components: {
    WindowFrame
  },
  data() {
    return {
      program: new IProgram("Paint", true, "https://win98icons.alexmeub.com/icons/png/paint_file-4.png")
    }
  },
  methods: {
    closeWindow() {
      this.$emit('closeWindow', "Paint")
    }
  }
})
</script>