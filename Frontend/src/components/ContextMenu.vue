<template>
  <div
    class="context-mmenu bg-gray-200 p-2 rounded bg-shadow absolute"
    :style="[{ top: position.y + 'px', left: position.x + 'px' }]"
  >
    <p>hejsa</p>
  </div>
</template>
<script setup lang="ts">
defineProps<{
  position: {
    x: number
    y: number
  }
}>()
</script>
