<template lang="pug">
Teleport(to="body" v-if="error !== undefined")
  WindowFrame(
    :program="{_id: 543245, name: 'Error', displayName: 'Error', isActive: true, image: ''}" 
    variant="red"
    :isMoveable="true"
  )
    .error-component.m-4
      .text-center
        IconComponent(name="bi-exclamation-octagon-fill" color="red" size="40")
      .ms-4.flex.items-center
        p {{ error.text }}
      div
        .flex.justify-center.mt-4
          ButtonComponent(@clicked="closeErrorComponent()" text="OK").px-4
</template>

<script setup lang="ts">
import { errorStore } from '@/stores/errorStore'
import { computed } from 'vue'

const errorstore = errorStore()
const error = computed(() => errorstore.error)

const closeErrorComponent = () => {
  errorstore.resetError()
}

</script>

<style lang="sass">
</style>