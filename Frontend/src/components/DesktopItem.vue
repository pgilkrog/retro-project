<template>
  <div
    class="desktop-item flex flex-col items-center text-white m-1 text-center cursor-pointer"
    v-bind="$attrs"
    @click="emit('generate-component')"
  >
    <IconComponent
      :color
      :name="image"
      size="34"
    />
    <p class="mt-2 line-clamp-2 bg-emerald-700 px-1 py-0.5">
      {{ displayName }}
    </p>
  </div>
</template>

<script setup lang="ts">
const { color = 'text-black', image = 'fa-house' } = defineProps<{
  color?: string
  image?: string
  displayName: string
}>()

const emit = defineEmits<{
  'generate-component': []
}>()
</script>
