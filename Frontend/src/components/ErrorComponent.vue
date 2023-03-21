<template lang="pug">
Teleport(to="body")
  .error-component.fixed-top.position-absolute(v-if="error !== undefined")
    WindowFrame(:program="{Id: 543245, Name: 'Error', IsActive: true, Image: ''}" variant="danger")
      .row.p-4
        .col-1.text-center
          i.bi.bi-exclamation-octagon-fill.text-danger
        .col-9
          p {{ error.text }}
        .col-2
          .d-flex.justify-content-center.mt-4
            button.btn(@click="closeErrorComponent()") OK
</template>

<script lang="ts">
import WindowFrame from './WindowFrame.vue'
import { errorStore } from '@/stores/errorStore'
import { defineComponent, computed } from 'vue'

export default defineComponent({
  props: {
    variant: String
  },
  components: {
    WindowFrame
  },
  setup (props) {
    const errorstore = errorStore()
    const error = computed(() => errorstore.getError)

    const closeErrorComponent = () => {
      errorstore.resetError()
    }

    return {
      error,
      closeErrorComponent
    }
  }
})
</script>