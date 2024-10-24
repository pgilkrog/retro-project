<template lang="pug">
.error-item(v-for="(error, index) in errorList" :ket="index")
  p {{ error.text }}
</template>

<script setup lang="ts">
import { useErrorStore } from '@/stores/errorStore'
import { computed } from 'vue'

const errorstore = useErrorStore()
const errorList = computed(() => errorstore.errors)

onMounted(async () => {
  await errorstore.getErrors()
})
</script>
