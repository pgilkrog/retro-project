<template lang="pug">
Component(
  v-for="program in activePrograms"
  :key="program._id"
  :is="getPath(program.name)"
  :program="program"
)
</template>

<script setup lang="ts">
import { computed, defineAsyncComponent } from 'vue'
import { programsStore } from '@/stores/programsStore'

const programsstore = programsStore()
const activePrograms = computed(() => programsstore.activePrograms)

// :is="defineAsyncComponent(() => import(`@/components/programs/${program.name}.vue`))"
const getPath = (name: string) => {
  return defineAsyncComponent(() => import(/* @vite-ignore */('./programs/'+name+'.vue').split('/').join('\/')).catch(() => console.log("could not find component", name)))
}

</script>