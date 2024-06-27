<template lang="pug">
KeepAlive(:max="10")
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

const programsstore = programsStore()

// :is="defineAsyncComponent(() => import(`@/components/programs/${program.name}.vue`))"
// const getPath = (name: string) => {

//   // Split the program name into parts separated by '/'
//   const pathParts = name.split('/')

//   // Encode any special characters in the path parts to ensure valid import path
//   const encodedPathParts = pathParts.map(part => encodeURIComponent(part))

//   // Join the encoded path parts with '/' to form the final path
//   const importPath = `./programs/${encodedPathParts.join('/')}.vue`

//   return import((importPath)).catch(() => console.log("could not find component", importPath))
// }

</script>