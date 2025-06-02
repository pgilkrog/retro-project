<template>
  <div class="bg-blue-500 flex justify-center items-center flex-col text-white">
    <IconComponent
      name="fa-computer"
      color="light"
      size="200"
    />
    <h1 class="light mt-4">Starting up...</h1>
  </div>
</template>

<script setup lang="ts">
import { watch } from 'vue'
import router from '@/router'

import { useAuthStore } from '@/stores/authStore'
import { programsStore } from '@/stores/programsStore'

const authstore = useAuthStore()
const programsstore = programsStore()
const checkAuth = ref<boolean>(authstore.checkedAuth)

watch(checkAuth, (newValue, oldValue) => {
  if (newValue === true && oldValue === false) {
    goToRoute()
  }
})

const goToRoute = () => {
  if (checkAuth.value) router.push('/home')
  else router.push('/login')
}

onMounted(async () => {
  await programsstore.programStoreInit()
  goToRoute()
})
</script>
