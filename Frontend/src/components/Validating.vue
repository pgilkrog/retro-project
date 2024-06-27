<template lang="pug">
WindowFrame(:program="program" :isMoveable="true" variant="danger")
  .flex.items-center.flex-col.p-4
    p Are you sure you want to 
    strong {{ text }}
  
    .buttons.mt-4.flex
      ButtonComponent.me-2(@clicked="emit('ok')" text="Ok" size="wide")
      ButtonComponent(@clicked="emit('cancel')" text="Cancel" size="wide") Cancel
</template>

<script setup lang="ts">
const { text } = defineProps<{
  text: string
}>()

const emit = defineEmits<{
  (e: 'ok'): void
  (e: 'cancel'): void
}>()

const program = {
  _id: 245,
  name: "Validate",
  displayName: "Validate",
  image: "fa-radiation", 
  isActive: true,
  color: "warning"
}
</script>