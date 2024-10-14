<template lang="pug">
Teleport(to="body" v-if="error !== undefined")
  WindowFrame(
    :program="errorProgram" 
    variant="red"
    :is-moveable="false"
  )
    .error-component(class="m-4 flex flex-col items-center space-y-4")
      div(class="flex space-x-4 items-center")
        IconComponent(name="bi-exclamation-octagon-fill" color="red" size="40")
        p {{ error.text }}
      ButtonComponent(@clicked="closeErrorComponent()" text="OK" class="px-16")
</template>

<script setup lang="ts">
import { useErrorStore } from '@/stores/errorStore'
import { computed } from 'vue'

const errorstore = useErrorStore()
const error = computed(() => errorstore.error)
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
