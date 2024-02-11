<template lang="pug">
WindowFrame(:program="program" :isMoveable="true")
  Suspense(timeout="0")
    template(#default)
      ErrorList
    template(#fallback)
      div.d-flex.p-4.justify-content-center
        .spinner-border
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { PropType } from 'vue'
import type { IProgram } from '@/models'

const { program } = defineProps({
  program: Object as PropType<IProgram>
})

const items = ref([] as any)

</script>