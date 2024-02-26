<template lang="pug">
.shut-down(class="flex h-screen justify-center items-center flex-col text-white")
  IconComponent(name="fa-power-off" variant="light" size="200")
  h1.mt-4 Shutting down...
  h4 Don't close down your browser
  //- div.progress
  //-   div.progress-bar(
  //-     role="progressbar" 
  //-     :aria-valuenow="progressValue" 
  //-     aria-valuemin="0" 
  //-     aria-valuemax="100"
  //-   ) {{ progressValue }}%
</template>

<script setup lang="ts"> 
import { ref } from 'vue'
const progressValue = ref<number>(0)
 
const startLoading = () => {
  let interval = setInterval(() => {
    if (progressValue.value < 100) {
      progressValue.value += 1
    } else {
      clearInterval(interval)
    }
  }, 100)
}
</script>