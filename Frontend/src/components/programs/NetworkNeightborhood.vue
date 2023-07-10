<template lang="pug">
WindowFrame(:program="program" :isMoveable="true")
  Suspense(timeout="0")
    template(#default)
      ErrorList
    template(#fallback)
      div.d-flex.p-4.justify-content-center
        .spinner-border
</template>

<script lang="ts">
import WindowFrame from '@/components/windowframe/WindowFrame.vue'
import ErrorList from '@/components/admin/ErrorList.vue'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'NetworkNeightborhood',
  components: {
    WindowFrame,
    ErrorList
  },
  props: {
    program: Object
  },
  setup() {
    const items = ref([] as any)

    return {
      items,
    }
  },
})
</script>