<template lang="pug">
.app-wrapper
  router-view
ErrorComponent
</template>

<script setup lang="ts">
import LoginScreen from './components/auth/LoginScreen.vue'
import Taskbar from '@/components/taskbar/Taskbar.vue'
import Menu from '@/components/menuComponents/Menu.vue'
import HomeView from '@/views/HomeView.vue'
import ErrorComponent from '@/components/ErrorComponent.vue'

import { userStore } from './stores/userStore'
import { authStore } from '@/stores/authStore'
import { programsStore } from './stores/programsStore'
import { 
  computed, 
  onMounted, 
  watch
} from 'vue'
import router from '@/router'

const authstore = authStore()
const userstore = userStore()
const programsstore = programsStore()

const userIsLoggedIn = computed(() => authstore.isLoggedIn)

onMounted(async () => {
  await authstore.init().then(() => {
    programsstore.init()

    userstore.getUserById().then((data) => {
      if (data !== undefined)
        programsstore.setInstalledPrograms(data.installedPrograms)
    })
    router.push('/')
  })
})
</script>