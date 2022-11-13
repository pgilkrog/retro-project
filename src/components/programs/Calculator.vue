<template lang="pug">
WindowFrame(:program="program" showMenu="true")
  .calculator-wrapper.row.gx-0
    hr
    input(type="text").light-border
    br
    div.mt-2
      button.st-border.px-2.p-1 1
      button.st-border.px-2.p-1.mx-1 2
      button.st-border.px-2.p-1 3
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import WindowFrame from '../WindowFrame.vue'

export default defineComponent({
  components: {
    WindowFrame
  },
  props: {
    program: Object
  },
  data() {
    return {

    }
  },
  methods: {
  }
})
</script>