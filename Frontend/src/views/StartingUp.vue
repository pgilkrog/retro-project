<template lang="pug">
.starting-up.bg-primary.d-flex.justify-content-center.align-items-center.flex-column.text-white
  IconComponent(name="fa-computer" variant="light" size="200")
  h1.light.mt-4 Starting up...
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