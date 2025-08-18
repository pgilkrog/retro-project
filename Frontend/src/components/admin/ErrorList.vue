<template>
  <div class="h-80 overflow-y-auto">
    <ul
      class="error-item"
      v-for="(error, key) in errorList"
      :key
    >
      <li>{{ error.text }}</li>
    </ul>
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
