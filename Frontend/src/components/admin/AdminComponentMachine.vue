<template lang="pug">
Component(
  v-for="program in activePrograms"
  @closeWindow="closeWindow(program.name)"
  :key="program._id"
  :id="program.name"
  :is="program.name"
  :program="program"
)
</template>

<script lang="ts">
import { defineComponent, computed, defineAsyncComponent } from 'vue'
import { programsStore } from '@/stores/programsStore'

import ManagePrograms from './managePrograms/ManagePrograms.vue'
import ManageUsers from './manageUsers/ManageUsers.vue'

export default defineComponent({
  name: 'AdminComponentMachine',
  components: {
    ManagePrograms,
    ManageUsers,
  },
  setup() {
    const programsstore = programsStore()

    const activePrograms = computed(() => programsstore.activePrograms)

    return {
      activePrograms,
    }
  },
})
</script>
