<template>
  <div
    class="error-item"
    v-for="(error, key) in errorList"
    :key
  >
    <p>{{ error.text }}</p>
  </div>
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
