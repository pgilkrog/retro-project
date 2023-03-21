<template lang="pug">
.admin-view.bg-fill.p-4
  .desktop-container
    DesktopItem(
      v-for="program in allPrograms"
      v-on:generateComponent="generateComponent(program)"
      :key="program.Id"
      :program="program"
      :itemColor="program.Color"
    )
  //- AdminComponentMachine
  button(@click="createProgram()") Test
</template>

<script lang="ts">
import { defineComponent } from 'vue'
// import AdminComponentMachine from '@/components/admin/AdminComponentMachine.vue'
import { programsStore } from '@/stores/programsStore'
import DesktopItem from '@/components/DesktopItem.vue'

export default defineComponent({
  name: 'adminView',
  components: {
    // AdminComponentMachine,
    DesktopItem
  },
  setup() {
    const allPrograms = [
      {
        Id: 3245, 
        Name: 'Program',
        DisplayName: 'Manage Programs',
        IsActive: true,
        Image: 'fa-computer'
      },
    ]
    const programsstore = programsStore()
    
    const generateComponent = (program: any) => {
      programsstore.addProgramToActive({...program})
    }

    const createProgram = () => {
      programsstore.createProgram()
    }

    return {
      allPrograms,
      generateComponent,
      createProgram
    }
  }
})
</script>

<style lang="sass" scoped>
</style>