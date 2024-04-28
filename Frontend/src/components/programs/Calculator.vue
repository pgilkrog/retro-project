<template lang="pug">
WindowFrame(:program="program" :isMoveable="true")
  .calculator-wrapper
    .d-flex.p-3
      .bg-light.w-100.rounded.bg-shadow-inner.d-flex.justify-content-end.p-2.pe-3
       p {{ display !== '' ? display : '0' }}
    .button-wrapper.p-3
      ButtonComponent(
        v-for="button in buttons" 
        :key="button.text"
        @clicked="handleClick(button)"
        :text="button.text"
      )
</template>

<script setup lang="ts">

interface Button {
  text: string
  value: string
}

const { program } = defineProps({
  program: Object
})

const display = ref('')
const buttons = [
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
] as Button[]
 
const handleClick = (button: Button) => {
  if (button.value === '=') {
    display.value = eval(display.value)
  } else {
    display.value += button.value
  }
}

</script>
<style scoped lang="sass">
.calculator-wrapper
  .button-wrapper
    display: grid
    grid-template-columns: auto auto auto auto    
    column-gap: 5px
    row-gap: 5px

</style>