<template lang="pug">
.check-box(class="flex space-x-2 items-center")
  label {{ label }}
  input(type="checkbox" v-model="model")
</template>
<script setup lang="ts">
const { label } = defineProps<{
  label?: string
}>()
const model = defineModel()
</script>
