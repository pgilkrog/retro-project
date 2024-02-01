<template lang="pug">
WindowFrame(
  :program="program"
  :isMoveable="true"
)
  .paw-eplorer
    .top-bar(class="flex m-2")
      Btn(icon="fa-caret-left")
      Btn(icon="fa-caret-right").mx-2
      Btn(icon="fa-rotate")
      BaseInput(v-model="inputText").mx-2
      Btn(icon="fa-rotate-right" text="GO" @click="go()")
    .browser-content(class=" w-auto bg-gray-50 bg-shadow-inner m-2")
      Component(:is="defineAsyncComponent(() => import(`./pages/${currentPage}.vue`))")
</template>
<script setup lang="ts">
import type { IProgram } from '@/models/index'
import { type PropType, ref, onMounted, defineAsyncComponent } from 'vue'

const { program } = defineProps({
  program: Object as PropType<IProgram>
})

const url = ref<string>('http://www.googol.dk')
const inputText = ref<string>('')
const currentPage = ref<string>('googol')

onMounted(() => {
  inputText.value = 'www.googol.dk'
})

const go = () => {
  url.value = inputText.value
}

</script>
<style lang="sass">
.browser-content
  height: 600px
  width: 700px
</style>