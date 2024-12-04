<template>
  <WindowFrame
    :program="program"
    :is-moveable="true"
  >
    <div class="paw-eplorer">
      <div class="top-bar flex m-2">
        <ButtonComponent icon="fa-caret-left" />
        <ButtonComponent icon="fa-caret-right" />
        <ButtonComponent icon="fa-rotate" />
        <InputComponent v-model="inputText" />
        <ButtonComponent 
          icon="fa-rotate-right" 
          text="GO" 
          @click="go()" 
        />
      </div>
      <div 
        v-if="isLoadingPage === false"
        class="h-[600px] w-[700px] bg-gray-50 bg-shadow-inner m-2" 
      >
        <Component :is="defineAsyncComponent(() => import(`./paw-explore/pages/${currentPage}.vue`))" />
      </div>
      <div 
        v-else
        class="h-[600px] w-[700px] bg-gray-50 bg-shadow-inner m-2 flex items-center justify-center text-5xl" 
      >
        <p> is Loading.. </p>
      </div>
    </div>
  </WindowFrame>
</template>
<script setup lang="ts">
import type { IProgram } from '@/models/index'
import { ref, defineAsyncComponent } from 'vue'

const { program } = defineProps<{
  program: IProgram
}>()

const inputText = ref<string>('')
const currentPage = ref<string>('googol')
const isLoadingPage = ref<boolean>(false)
const pageHistory = ref<string[]>([])

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
  pageHistory.value.push(pageToComponent[1])
}
</script>
