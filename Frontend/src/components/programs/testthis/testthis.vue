<template lang="pug">
WindowFrame(
  :program="program" 
  :isMoveable="true"
  :variant="program.color"
  :showMenu="false"
)
  | hejsa
</template>
<script setup lang="ts">
const program = {
  _id: 245,
  name: "FileExplorer",
  displayName: "File explorer",
  image: "bi-joystick", 
  isActive: true,
  color: "warning"
}
</script>