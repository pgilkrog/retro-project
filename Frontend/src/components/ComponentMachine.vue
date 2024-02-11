<template lang="pug">
Component(
  v-for="program in programsstore.activePrograms"
  :key="program._id"
  :is="defineAsyncComponent(() => import(`@/components/programs/${program.name}.vue`))"
  :program="program"
)
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import { programsStore } from '@/stores/programsStore'

import MyComputer from './programs/MyComputer.vue'

const programsstore = programsStore()

// :is="defineAsyncComponent(() => import(`@/components/programs/${program.name}.vue`))"
const getPath = (name: string) => {
  return defineAsyncComponent(() => import(/* @vite-ignore */('./programs/'+name+'.vue')).catch(() => console.log("could not find component", name)))
}

</script>