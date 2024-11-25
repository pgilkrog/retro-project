<template>
  <div 
    class="app-wrapper" 
    id="app"
  >
    <RouterView />
    <ErrorComponent v-if="error !== undefined" />
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/authStore'
import { watch } from 'vue'
import router from './router'
import { useCookies } from 'vue3-cookies'
import { useErrorStore } from '@/stores/errorStore'
import { storeToRefs } from 'pinia'

const authstore = useAuthStore()
const errorStore = useErrorStore()

const { checkedAuth } = storeToRefs(authstore)
const { error } = storeToRefs(errorStore)

const { cookies } = useCookies()

onMounted(async () => {
  await authstore.checkIfUserIsLoggedIn()

  const my_cookies_value = cookies.get('myCookie')
  console.log('COOKIE', my_cookies_value)
  cookies.set(
    'LAST_RESULT_ENTRY_KEY',
    'your_cookie_value',
    '7d',
    undefined,
    undefined,
    true,
    'None'
  )
  console.log('error', error)
})

watch(checkedAuth, async (newValue, oldValue) => {
  if (newValue === true && oldValue === false) {
    await router.push('/')
  }
})
</script>
