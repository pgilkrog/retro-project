<template>
  <Component
    v-for="program in activePrograms"
    :key="program._id"
    :id="program.name"
    :is="program.name"
    :program="program"
  />
</template>

<script setup lang="ts">
import { programsStore } from '@/stores/programsStore'

import ManagePrograms from './managePrograms/ManagePrograms.vue'
import ManageUsers from './manageUsers/ManageUsers.vue'

const programsstore = programsStore()

const activePrograms = computed(() => programsstore.activePrograms)
</script>
