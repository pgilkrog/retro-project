<template>
  <Component
    v-for="program in programsstore.activePrograms"
    :key="program._id"
    :id="program.name"
    :is="adminProgramComponents[program.name] ?? ErrorComponent"
    :program="program"
  />
</template>

<script setup lang="ts">
import type { Component } from 'vue'
import { programsStore } from '@/stores/programsStore'
import ErrorComponent from '@/components/ErrorComponent.vue'

import ManagePrograms from './managePrograms/ManagePrograms.vue'
import ManageUsers from './manageUsers/ManageUsers.vue'

const programsstore = programsStore()

const adminProgramComponents: Record<string, Component> = {
  ManagePrograms,
  ManageUsers,
}
</script>
