<template>
  <WindowFrame
    :program="program"
    variant="primary"
    :is-moveable="true"
    :show-menu="true"
  >
    <div class="bg-black text-white p-4">
      <p>Retro-Project Desktop 97</p>
      <p class="ms-4">(C)Copyright Someting, Something Complete</p>
      <p
        v-for="(s, index) in textWritten"
        :key="index"
        v-html="s"
      />
      <div class="d-flex mt-4">
        <p>C:\DESKTOP&#62;</p>
        <form @submit.prevent="submitMethod">
          <input
            autofocus
            v-model="inputText"
            class="bg-black text-white w-100 border-none"
          />
        </form>
      </div>
    </div>
  </WindowFrame>
</template>

<script setup lang="ts">
import type { IProgram } from '@/models'
import router from '@/router'

const { program } = defineProps<{
  program: IProgram
}>()

const inputText = ref<string>('')
const textWritten = ref<string[]>([])
const helpText: string[] = ['<ol class="ms-4">' + '<li>Play-PingPong</li>' + '<li>Play-FlappyDisk</li>' + '</ol>']

const submitMethod = () => {
  if (inputText.value === '') {
    return
  }

  textWritten.value.push(inputText.value)
  commands(inputText.value)
  inputText.value = ''
}

const commands = (text: string) => {
  const tempText = text.trim().replace(' ', '').toLocaleLowerCase()

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
