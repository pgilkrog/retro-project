<template>
  <div class="admin-view p-4">
    <div class="desktop-container">
      <DesktopItem
        v-for="program in allPrograms"
        :key="program._id"
        class="mt-4"
        :display-name="program.displayName"
        :color="program.color"
        :name="program.image"
        @generate-component="generateComponent(program)"
      />
    </div>
    <AdminComponentMachine />
  </div>
</template>

<script setup lang="ts">
import AdminComponentMachine from '@/components/admin/AdminComponentMachine.vue'
import type { IProgram } from '@/models'
import { programsStore } from '@/stores/programsStore'

const programsstore = programsStore()

const allPrograms: IProgram[] = [
  {
    _id: '3245',
    name: 'ManagePrograms',
    displayName: 'Manage Programs',
    isActive: true,
    image: 'fa-computer',
    color: 'light',
    sortOrder: 1,
    top: 10,
    left: 10,
    type: 'Program',
  },
  {
    _id: '5432',
    name: 'ManageUsers',
    displayName: 'Manage Users',
    isActive: true,
    image: 'fa-users',
    color: 'light',
    sortOrder: 2,
    top: 10,
    left: 10,
    type: 'Program',
  },
]

const generateComponent = (program: IProgram) => {
  programsstore.addProgramToActive(program)
}
</script>
