<template>
  <WindowFrame
    :program="program"
    :is-moveable="true"
    :variant="program.color"
    :show-menu="false"
  >
    <p>hejsa</p>
  </WindowFrame>
</template>
<script setup lang="ts">
const program = {
  _id: 245,
  name: 'FileExplorer',
  displayName: 'File explorer',
  image: 'bi-joystick',
  isActive: true,
  color: 'warning',
}
</script>
