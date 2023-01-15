<template lang="pug">
.error-component
  WindowFrame(:program="{Id: 543245, Name: 'Error', IsActive: true, Image: ''}" variant="danger")
    .row.p-4
      .col-1.text-center
        i.bi.bi-exclamation-octagon-fill.text-danger
      .col-9
        p {{ text }}
      .col-2
        .d-flex.justify-content-center.mt-4
          botton.btn(@click="closeErrorComponent()") OK
</template>

<script lang="ts">
import WindowFrame from './WindowFrame.vue'
import { errorStore } from '@/stores/errorStore'

export default {
  props: {
    text: String,
    variant: String
  },
  components: {
    WindowFrame
  },
  data() {
    return {
      errorstore: errorStore()
    }
  },
  methods: {
    closeErrorComponent() {
      this.errorstore.resetError()
    }
  }
}
</script>