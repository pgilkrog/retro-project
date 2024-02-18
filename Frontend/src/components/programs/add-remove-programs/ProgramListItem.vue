<template lang="pug">
.wrapper(class="flex items-center justify-between px-4 py-2 cursor-pointer hover:bg-blue-500 hover:text-white")
  span(class="flex items-center mr-8")
    IconComponent(
    class="w-12" 
    :variant="color" 
    :name="icon"
  )
    p {{ name }}
  p(class="just") {{ getSize }}
</template>
<script setup lang="ts">
const {
  color,
  name,
  icon
 } = defineProps({
  name: String,
  icon: String,
  color: String
})
const getSize = computed(() => {
 return `size: ${Math.round(Math.random() * 1000)}kb`
})
</script>