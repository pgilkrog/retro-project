<template>
  <Component
    v-for="program in programsstore.activePrograms"
    :key="program._id"
    v-memo="[program._id]"
    :is="
      defineAsyncComponent(
        () =>
          import(
            `@/components/programs/${convertNameToKebabCase(program.name)}/${program.name}.vue`
          )
      )
    "
    :program="program"
  />
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import { programsStore } from '@/stores/programsStore'
import { convertNameToKebabCase } from '@/utils/converters'

const programsstore = programsStore()
</script>
