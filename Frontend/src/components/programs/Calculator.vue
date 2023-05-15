<template lang="pug">
WindowFrame(:program="program" :isMoveable="true")
  .calculator-wrapper
    .d-flex.p-3.w-100
      .bg-light.w-100.rounded.bg-shadow-inner.d-flex.justify-content-end.p-2.pe-3
       p {{ display !== '' ? display : '0' }}
    .button-wrapper.p-3
      button.btn(
        v-for="button in buttons" 
        :key="button.text"
        @click="handleClick(button)"
      ) {{ button.text }}
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import WindowFrame from '@/components/windowframe/WindowFrame.vue'

interface Button {
  text: string
  value: string
}

export default defineComponent({
  components: {
    WindowFrame
  },
  props: {
    program: Object
  },
  data() {
    return {
      display: '',
      buttons: [
        { text: '1', value: '1' },
        { text: '2', value: '2' },
        { text: '3', value: '3' },
        { text: '+', value: '+' },
        { text: '4', value: '4' },
        { text: '5', value: '5' },
        { text: '6', value: '6' },
        { text: '-', value: '-' },
        { text: '7', value: '7' },
        { text: '8', value: '8' },
        { text: '9', value: '9' },
        { text: '*', value: '*' },
        { text: '0', value: '0' },
        { text: '.', value: '.' },
        { text: '/', value: '/' },
        { text: '=', value: '=' },
      ] as Button[],
    }
  },
  methods: {
    handleClick(button: Button) {
      if (button.value === '=') {
        this.display = eval(this.display);
      } else {
        this.display += button.value;
      }
    },
  }
})
</script>