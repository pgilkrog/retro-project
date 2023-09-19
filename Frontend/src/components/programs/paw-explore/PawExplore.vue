<template lang="pug">
WindowFrame(
  :program="program"
  :isMoveable="true"
)
  .paw-eplorer
    .top-bar.d-flex.p-1
      Btn(icon="fa-caret-left")
      Btn(icon="fa-caret-right").mx-2
      Btn(icon="fa-rotate")
      BaseInput(v-model="inputText").mx-2
      Btn(icon="fa-rotate-right" text="GO" @click="go()")
    .browser-content
      iframe(
        height="500"
        width="800"
        :src="url"
      ).bg-shadow-inner
</template>
<script setup lang="ts">
import type { IProgram } from '@/models/index'
import { type PropType, ref } from 'vue'

const { program } = defineProps({
  program: Object as PropType<IProgram>
})

const url = ref<string>('http://www.pawgilkrog.dk')
const inputText = ref<string>('')

const go = () => {
  url.value = inputText.value
}

</script>