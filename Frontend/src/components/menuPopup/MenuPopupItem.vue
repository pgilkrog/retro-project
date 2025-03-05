<template>
  <div
    @click="method({ item: 'yes' })"
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
  method: () => 0
}>()
</script>
