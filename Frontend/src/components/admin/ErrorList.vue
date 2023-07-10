<template lang="pug">
.error-item(v-for="(error, index) in errorList" :ket="index")
  p {{ error.text }}
</template>

<script setup lang="ts">
import type { IErrorItem } from '@/models';
import { errorStore } from '@/stores/errorStore';
import { computed } from 'vue'

const errorstore = errorStore()
const errorList = computed(() => errorstore.errors)
    
try {
  await errorstore.getErrors()
} catch {
  console.error("error getting errors")
}
</script>

<style lang="sass" scoped>
</style>