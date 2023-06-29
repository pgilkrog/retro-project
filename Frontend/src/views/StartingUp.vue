<template lang="pug">
.starting-up.bg-primary.d-flex.justify-content-center.align-items-center.flex-column.text-white
  IconComponent(name="fa-computer" variant="light" size="200")
  h1.light.mt-4 Starting up...
</template>

<script setup lang="ts">
import { authStore } from '@/stores/authStore'
import { computed, ref, watch, onMounted } from 'vue'
import router from '@/router'

const progressValue = ref<number>(0)
const authstore = authStore()
const checkAuth = computed(() => authstore.checkedAuth)

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

onMounted(() => {
  goToRoute()
})

</script>