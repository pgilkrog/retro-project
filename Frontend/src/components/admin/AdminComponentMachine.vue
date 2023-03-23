<template lang="pug">
Component(
  v-for="(program, index) in activePrograms"
  v-on:closeWindow="closeWindow(program.name)"
  :key="index"
  :id="program.name"
  :is="program.name"
  :program="program"
)
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { programsStore } from '@/stores/programsStore'
import ManagePrograms from './ManagePrograms.vue'

export default defineComponent({
  name: 'AdminComponentMachine',
  components: {
    ManagePrograms
  },
  setup() {
    const programsstore = programsStore()

    const activePrograms = computed(() => programsstore.getActivePrograms)

    return {
      activePrograms
    }
  }
})
</script>

<style lang="sass" scoped>
</style>