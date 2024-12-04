<template>
  <div class="check-box flex space-x-2 items-center">
    <label>{{ label }}</label>
    <input
      type="checkbox"
      v-model="model"
    />
  </div>
</template>
<script setup lang="ts">
const { label } = defineProps<{
  label?: string
}>()
const model = defineModel<boolean>()
</script>
