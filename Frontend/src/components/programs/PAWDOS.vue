<template lang="pug">
WindowFrame(:program="program" variant="primary" :isMoveable="true" :showMenu="true")
  .bg-black.text-white.p-4
    p Retro-Project Desktop 97
    P.ms-4 (C)Copyright Someting, Something Complete
    .my-4
    p(v-for="s in textWritten" v-html="s")
    .d-flex.mt-4
      p C:\DESKTOP&#62;
      form(@submit.prevent="submitMethod")
        input(autofocus v-model="inputText").bg-black.text-white.w-100.border-none
</template>

<script setup lang="ts">
import type { IProgram } from '@/models'
import router from '@/router'

const { program } = defineProps<{
  program: IProgram
}>()

const emit = defineEmits<{
  (e: 'closeWindow', text: string): void
}>()

const inputText = ref<string>('')
const textWritten = ref<string[]>([])
const helpText = [
  '<ol class="ms-4">' +
  '<li>Play-PingPong</li>' +
  '<li>Play-FlappyDisk</li>' +
  '</ol>'
]

const closeWindow = () => {
  emit('closeWindow', 'NetworkNeighborhood')
}
const submitMethod = () => {
  if (inputText.value === '')
    return

  textWritten.value.push(inputText.value)
  commands(inputText.value)
  inputText.value = ''
}

const commands = (text: string) => {
  let tempText = text.trim().replace(" ", "").toLocaleLowerCase()
  switch (tempText) {
    case 'help': {
      textWritten.value = textWritten.value.concat(helpText)
      break
    }
    case 'playpingpong': {
      router.push('/pingpong')
      break
    }
    case 'playflappydisk': {
      router.push('/flappydisk')
      break
    }
    default: {
      break
    }
  }
}
</script>