<template>
  <div
    class="flex items-center gap-x-2 cursor-pointer"
    @click="method({ item: { name: name, icon: icon } })"
  >
    <IconComponent :name="icon" />
    <p>{{ name }}</p>
  </div>
</template>
<script setup lang="ts">
const {
  name,
  icon,
  method = () => {
    console.log('default method yo')
  },
} = defineProps<{
  name: string
  icon: string
  method?: (item: object) => void
}>()
</script>
