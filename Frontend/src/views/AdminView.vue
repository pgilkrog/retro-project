<template lang="pug">
.admin-view.bg-fill.p-4
  .desktop-container
    DesktopItem.mt-4(
      v-for="program in allPrograms"
      v-on:generateComponent="generateComponent(program)"
      :key="program.Id"
      :program="program"
      :itemColor="program.color"
    )
  AdminComponentMachine
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AdminComponentMachine from '@/components/admin/AdminComponentMachine.vue'
import { programsStore } from '@/stores/programsStore'
import DesktopItem from '@/components/DesktopItem.vue'

export default defineComponent({
  name: 'adminView',
  components: {
    AdminComponentMachine,
    DesktopItem
  },
  setup() {
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

    return {
      allPrograms,
      generateComponent
    }
  }
})
</script>

<style lang="sass" scoped>
</style>