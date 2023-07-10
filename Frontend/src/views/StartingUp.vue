<template lang="pug">
.starting-up.bg-primary.d-flex.justify-content-center.align-items-center.flex-column.text-white
  IconComponent(name="fa-computer" variant="light" size="200")
  h1.light.mt-4 Starting up...
</template>

<script setup lang="ts">
import { computed, ref, watch, onMounted } from 'vue'
import router from '@/router'

import { userStore } from '@/stores/userStore'
import { authStore } from '@/stores/authStore'
import { programsStore } from '@/stores/programsStore'

const authstore = authStore()
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
    debugger
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
  debugger
  await authstore.init()
  await programsstore.init()
  await userstore.getUserById().then((data) => {
    if (data !== undefined)
      programsstore.setInstalledPrograms(data.installedPrograms)
  })
  goToRoute()
})  

</script>