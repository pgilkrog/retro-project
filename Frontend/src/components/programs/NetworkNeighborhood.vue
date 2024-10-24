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
import type { IProgram } from '@/models'

const { program } = defineProps<{
  program: IProgram
}>()
</script>
