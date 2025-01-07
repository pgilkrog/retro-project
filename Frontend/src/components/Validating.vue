<template>
  <WindowFrame
    :program="program"
    :is-moveable="true"
    variant="danger"
  >
    <div class="flex items-center flex-col p-4">
      <p>Are you sure you want to</p>
      <strong>{{ text }}</strong>

      <div class="buttons mt-4 flex">
        <ButtonComponent
          class="me-2"
          text="Ok"
          size="wide"
          @clicked="emit('ok')"
        />
        <ButtonComponent
          text="Cancel"
          size="wide"
          @clicked="emit('cancel')"
        />
      </div>
    </div>
  </WindowFrame>
</template>

<script setup lang="ts">
const { text } = defineProps<{
  text: string
}>()

const emit = defineEmits<{
  ok: []
  cancel: []
}>()

const program = {
  _id: 245,
  name: 'Validate',
  displayName: 'Validate',
  image: 'fa-radiation',
  isActive: true,
  color: 'warning',
}
</script>
