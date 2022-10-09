<template lang="pug">
WindowFrame(title="MS-DOS" v-on:closeWindow="closeWindow" image="https://win98icons.alexmeub.com/icons/png/ms_dos-1.png")
  .bg-black.text-white
    p HEJSA
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import WindowFrame from '../WindowFrame.vue';

@Component({
  components: {
    WindowFrame
  }
})

export default class MSDOS extends Vue {
  closeWindow() {
    this.$emit('closeWindow', "NetworkNeighborhood")
  }
} 
</script>