<template lang="pug">
.app-wrapper
  router-view
ErrorComponent
</template>

<script setup lang="ts">
import { userStore } from './stores/userStore'
import { authStore } from '@/stores/authStore'
import { programsStore } from './stores/programsStore'
import { onMounted, computed, watch } from 'vue'
import router from './router'
import ErrorComponent from './components/ErrorComponent.vue'

const authstore = authStore()
const userstore = userStore()
const programsstore = programsStore()
const checkAuth = computed(() => authstore.checkedAuth)

onMounted(async () => {
  await authstore.init()
  await programsstore.init()
  await userstore.getUserById().then((data) => {
    if (data !== undefined)
      programsstore.setInstalledPrograms(data.installedPrograms)
  })
})  

watch(checkAuth, (newValue, oldValue) => {
  if (newValue === true && oldValue === false) {
    router.push('/')
  }
})

</script>