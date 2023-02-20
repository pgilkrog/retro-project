<template lang="pug">
.home-wrapper.bg-fill.p-4
  .desktop-container
    DesktopItem(
      v-for="program in allPrograms"
      v-on:generateComponent="generateComponent(program)"
      :key="program.Id"
      :program="program"
      :itemColor="program.Color"
    )
  ComponentMachine
  Loading
</template>

<script lang="ts">
import type { IProgram } from '@/models/index'
import { defineComponent } from 'vue'
import DesktopItem from '@/components/DesktopItem.vue'
import { programsStore } from '@/stores/programsStore'
import ComponentMachine from '@/components/ComponentMachine.vue'
import Loading from '@/components/Loading.vue'

export default defineComponent({
  components: {
    DesktopItem,
    ComponentMachine,
    Loading
  },
  data() {
    return {
      programsstore: programsStore()
    }
  },
  computed: {
    allPrograms(): IProgram[] {
      return this.programsstore.getPrograms
    }
  },
  methods: {
    generateComponent(program: IProgram) {
      this.programsstore.addProgramToActive({...program})
    },
  }
})
</script>