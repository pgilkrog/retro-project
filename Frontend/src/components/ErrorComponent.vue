<template>
  <WindowFrame
    :program="errorProgram"
    variant="red"
    :is-moveable="false"
  >
    <div class="error-component m-4 flex flex-col items-center space-y-4">
      <div class="flex space-x-4 items-center">
        <IconComponent
          name="bi-exclamation-octagon-fill"
          color="red"
          size="40"
        />
        <p>{{ errorstore.error?.text }}</p>
      </div>
      <ButtonComponent
        text="OK"
        class="px-16"
        @clicked="closeErrorComponent()"
      />
    </div>
  </WindowFrame>
</template>

<script setup lang="ts">
import { useErrorStore } from '@/stores/errorStore'

const errorstore = useErrorStore()
const errorProgram = {
  _id: 543245,
  name: 'Error',
  displayName: 'Error',
  isActive: true,
  image: '',
}

const closeErrorComponent = () => {
  errorstore.resetError()
}
</script>
