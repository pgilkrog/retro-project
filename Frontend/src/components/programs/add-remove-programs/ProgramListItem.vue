<template>
  <div class="programListItem flex items-center justify-between px-4 py-2 cursor-pointer hover:bg-blue-500 hover:text-white">
    <span class="flex items-center">
      <IconComponent 
        class="w-12" 
        :color="color" 
        :name="image" 
      />
      <p>{{ displayName }}</P>
    </span>
    <p class="just">
      {{ getSize }}
    </p>
  </div>
</template>
<script setup lang="ts">
const { color, displayName, image } = defineProps<{
  displayName: string
  image: string
  color: string
}>()

const getSize = computed(() => {
  return `size: ${(Math.round(Math.random() * 1000)).toString()}kb`
})
</script>
