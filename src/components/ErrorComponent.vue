<template lang="pug">
.error-component.d-flex()
  WindowFrame(:program="{Id: 543245, Name: 'Error', IsActive: true, Image: ''}" variant="danger")
    .d-flex.p-4
      i.bi.bi-exclamation-octagon-fill.text-danger
      p {{ text }}
      .d-flex.justify-content-center.mt-4
        b-botton.btn.bg-shadow OK
</template>

<script lang="ts">
import WindowFrame from './WindowFrame.vue'
export default {
  props: {
    text: String,
    variant: String
  },
  components: {
    WindowFrame
  },
  methods: {
    closeErrorComponent() {

    }
  }
}
</script>