<template lang="pug">
Component(
  v-for="(program, index) in activePrograms"
  :key="index"
  :is="defineAsyncComponent(() => import(/* @vite-ignore */getPath(program.name)))"
  :program="program"
)
</template>

<script setup lang="ts">
import { computed, defineAsyncComponent } from 'vue'
import { programsStore } from '@/stores/programsStore'

const programsstore = programsStore()
const activePrograms = computed(() => programsstore.activePrograms)

// :is="defineAsyncComponent(() => import(`@/components/programs/${program.name}.vue`))"
const getPath = (name: string): string => {
  return ('./programs/'+name+'.vue').split('/').join('\/')
}

</script>