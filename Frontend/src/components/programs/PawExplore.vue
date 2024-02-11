<template lang="pug">
WindowFrame(
  :program="program"
  :isMoveable="true"
)
  .paw-eplorer
    .top-bar(class="flex m-2")
      ButtonComponent(icon="fa-caret-left")
      ButtonComponent(icon="fa-caret-right").mx-2
      ButtonComponent(icon="fa-rotate")
      InputComponent(v-model="inputText").mx-2
      ButtonComponent(icon="fa-rotate-right" text="GO" @click="go()")
    .browser-content(class="w-auto bg-gray-50 bg-shadow-inner m-2" v-if="isLoadingPage === false")
      Component(:is="defineAsyncComponent(() => import(`./paw-explore/pages/${currentPage}.vue`))")
    .loading-content(class="w-auto bg-gray-50 bg-shadow-inner m-2 flex items-center justify-center text-5xl" v-else)
      p is Loading..

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
const isLoadingPage = ref(false)

onMounted(() => {
  inputText.value = 'www.googol.dk'
})

const go = () => {
  isLoadingPage.value = true
  const pageToComponent = inputText.value.split('.')
  currentPage.value = pageToComponent[1]
  setTimeout(() => {
    isLoadingPage.value = false
  }, 500)
}

</script>
<style lang="sass">
.browser-content, .loading-content
  height: 600px
  width: 700px
</style>