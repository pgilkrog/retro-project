<template lang="pug">
WindowFrame(:program="program" :isMoveable="true" variant="danger")
  .d-flex.align-items-center.flex-column.p-4
    p Are you sure you want to 
    strong {{ text }}
  
    .buttons.mt-4
      Btn.me-2(@clicked="ok()" text="Ok" size="wide")
      Btn(@clicked="cancel()" text="Cancel" size="wide") Cancel
</template>

<script setup lang="ts">
const { text } = defineProps({
  text: String
})

const emit = defineEmits([
  'ok',
  'cancel'
]) 

const program = {
  id: 245,
  name: "Validate",
  displayName: "Validate",
  image: "fa-radiation", 
  isActive: true,
  color: "warning"
}

const ok = () => {
  emit('ok')
}

const cancel = () => {
  emit('cancel')
}
</script>

<style lang="sass" scoped>
</style>