<template lang="pug">
.desktop-item(
  @click="emit('generateComponent')" 
  class="flex flex-col items-center text-white w-64 m-1 text-center cursor-pointer"
  v-bind="$attrs"
)
  IconComponent(
    :color
    :name
    size="34"
  )
  p(class="mt-2 line-clamp-2") {{ displayName }}
</template>

<script setup lang="ts">

const { color, name = 'fa-house' } = defineProps<{
  color: string,
  name: string,
  displayName: string
}>()

const emit = defineEmits<{
  (e:'generate-component'): void
}>()
</script>