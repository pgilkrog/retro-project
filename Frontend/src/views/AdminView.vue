<template lang="pug">
.admin-view.bg-fill.p-4
  .desktop-container
    DesktopItem.mt-4(
      v-for="program in allPrograms"
      v-on:generateComponent="generateComponent(program)"
      :key="program._id"
      :displayName="program.displayName"
      :color="program.color"
      :name="program.image"
    )
  AdminComponentMachine
</template>

<script setup lang="ts">
import AdminComponentMachine from '@/components/admin/AdminComponentMachine.vue'
import { programsStore } from '@/stores/programsStore'

const allPrograms = [
  {
    id: 3245, 
    name: 'ManagePrograms',
    displayName: 'Manage Programs',
    isActive: true,
    image: 'fa-computer',
    color: 'light'
  },
  {
    id: 5432, 
    name: 'ManageUsers',
    displayName: 'Manage Users',
    isActive: true,
    image: 'fa-users',
    color: 'light'
  },
]
const programsstore = programsStore()

const generateComponent = (program: any) => {
  programsstore.addProgramToActive({...program})
}
</script>

<style lang="sass" scoped>
</style>