<template>
  <WindowFrame  
    :program="program" 
    :is-moveable="true"
  >
    <Suspense imeout="0">
      <template #default>
        <ErrorList />
      </template>
      <template #fallback>
        <div class="flex p-4 justify-center">
          <div class="spinner-border" />
        </div>
      </template>
    </Suspense>
  </WindowFrame>
</template>

<script setup lang="ts">
import type { IProgram } from '@/models'

const { program } = defineProps<{
  program: IProgram
}>()
</script>
