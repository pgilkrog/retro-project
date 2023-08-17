<template lang="pug">
WindowFrame(:program="props.program" :isMoveable="true")
  Suspense(timeout="0")
    template(#default)
      ErrorList
    template(#fallback)
      div.d-flex.p-4.justify-content-center
        .spinner-border
</template>

<script setup lang="ts">
import WindowFrame from '@/components/windowframe/WindowFrame.vue'
import ErrorList from '@/components/admin/ErrorList.vue'
import { ref } from 'vue'

const props = defineProps({
  program: Object
})

const items = ref([] as any)

</script>