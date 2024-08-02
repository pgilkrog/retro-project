<template lang="pug">
.starting-up(class="bg-blue-500 flex justify-center items-center flex-col text-white")
  IconComponent(name="fa-computer" color="light" size="200")
  h1.light.mt-4 Starting up...
</template>

<script setup lang="ts">
import { watch } from 'vue'
import router from '@/router'

import { userStore } from '@/stores/userStore'
import { useAuthStore } from '@/stores/authStore'
import { programsStore } from '@/stores/programsStore'

const authstore = useAuthStore()
const userstore = userStore()
const programsstore = programsStore()

const progressValue = ref<number>(0)
const checkAuth = ref<Boolean>(authstore.checkedAuth)

const startLoading = () => {
  let interval = setInterval(() => {
    if (progressValue.value < 100) {
      progressValue.value += 1
    } else {
      clearInterval(interval)
    }
  }, 100)
}

watch(checkAuth, (newValue, oldValue) => {
  if (newValue === true && oldValue === false) {
    goToRoute()
  }
})

const goToRoute = () => {
  if (checkAuth.value)
    router.push('/home')
  else
    router.push('/login')
}

onMounted(async () => {
  await authstore.init()
  await programsstore.init()
  goToRoute()
})  

</script>