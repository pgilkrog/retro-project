<template lang="pug">
.programs-component
  WindowFrame(:program="program" variant="info")
    .row.p-4
      h1 hejsa
</template>

<script lang="ts">
import type { IProgram } from '@/models';
import WindowFrame from '../WindowFrame.vue'
import { defineComponent } from 'vue'
import { program } from '@babel/types';

export default defineComponent({
  components: {
    WindowFrame
  },
  props: {
    program: Object
  },
  setup (props) {
    console.log(props.program)
  }
})
</script>