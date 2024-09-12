<template lang="pug">
WindowFrame(:program="program" :isMoveable="true")
  .calculator-wrapper
    .display(class="flex p-3 bg-gray-200 w-100 rounded bg-shadow-inner my-2 mx-4 justify-end text")
      p {{ display !== '' ? display : '0' }}
    .button-wrapper(class="grid grid-cols-4 m-4 gap-4 w-100")
      ButtonComponent(
        class=" !px-0 py-2"
        v-for="button in buttons" 
        :key="button.vlue"
        @clicked="handleClick(button)"
        :text="button.text"
        size="text-2xl"
      )
</template>

<script setup lang="ts">
interface Button {
  text: string
  value: string
}

const { program } = defineProps<{
  program: Object
}>()

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
