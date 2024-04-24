<template lang="pug">
.app-wrapper(id="app")
  router-view
ErrorComponent(v-if="errorstore.error !== undefined")

</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/authStore'
import { computed, watch } from 'vue'
import router from './router'
import { useCookies } from 'vue3-cookies'
import { errorStore } from '@/stores/errorStore'

const authstore = useAuthStore()
const checkAuth = computed(() => authstore.checkedAuth)
const errorstore = errorStore()
const { cookies } = useCookies()

onMounted(async () => {
  await authstore.init()
  let my_cookies_value = cookies.get("myCookie")
  console.log("COOKIE", my_cookies_value)
  cookies.set('LAST_RESULT_ENTRY_KEY', 'your_cookie_value', '7d', undefined, undefined, true, 'None')
  console.log("error", errorstore.error)
})  

watch(checkAuth, (newValue, oldValue) => {
  if (newValue === true && oldValue === false) {
    router.push('/')
  }
})

</script>