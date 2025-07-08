<template>
  <div
    @click="method({ item: { name: name, icon: icon } })"
    class="flex items-center gap-x-2 cursor-pointer"
  >
    <IconComponent :name="icon" />
    <p>{{ name }}</p>
  </div>
</template>
<script setup lang="ts">
const { name, icon, method } = defineProps<{
  name: string
  icon: string
  method: (item: object) => void
}>()
</script>
