<template lang="pug">
Component(
  v-for="(program, index) in activePrograms"
  v-on:closeWindow="closeWindow(program.Name)"
  :key="index"
  :id="program.Name"
  :is="program.Name"
  :program="program"
)
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import Program from './Progams.vue'
import { programsStore } from '@/stores/programsStore'

export default defineComponent({
  name: 'AdminComponentMachine',
  components: {
    Program
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