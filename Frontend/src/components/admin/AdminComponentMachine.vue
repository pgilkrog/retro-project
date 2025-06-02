<template>
  <Component
    v-for="program in activePrograms"
    :key="program._id"
    :id="program.name"
    :is="
      defineAsyncComponent(
        () =>
          import(
            `./${program.name.slice(0, 1).toLocaleLowerCase() + program.name.slice(1, program.name.length)}/${program.name}.vue`
          )
      )
    "
    :program="program"
  />
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import { programsStore } from '@/stores/programsStore'

import ManagePrograms from './managePrograms/ManagePrograms.vue'
import ManageUsers from './manageUsers/ManageUsers.vue'

const programsstore = programsStore()

const activePrograms = computed(() => programsstore.activePrograms)
</script>
