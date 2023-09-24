<template lang="pug">
Teleport(to="body" v-if="error !== undefined")
  WindowFrame(
    :program="{_id: 543245, name: 'Error', displayName: 'Error', isActive: true, image: ''}" 
    variant="danger"
    :isMoveable="true"
  )
    .error-component
      .row.p-4
        .col-12.col-sm-1.text-center
          IconComponent(name="bi-exclamation-octagon-fill" variant="danger" size="40")
        .col-12.col-sm-8.ms-4.d-flex.align-items-center
          p {{ error.text }}
        .col-12.col-sm-2
          .d-flex.justify-content-center.mt-4
            Btn(@clicked="closeErrorComponent()" text="OK").px-4
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