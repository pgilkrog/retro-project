<template lang="pug">
.home-wrapper.bg-fill.p-4
  .desktop-container
    DesktopItem(
      v-for="program in allPrograms()"
      v-on:generateComponent="generateComponent(program)"
      :key="program.id"
      :program="program"
      :itemColor="program.color"
    )
  ComponentMachine
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
  setup() {
    const programsstore = programsStore()

    const allPrograms = (() => programsstore.getPrograms)

    const generateComponent = (program: IProgram) => {
      programsstore.addProgramToActive({...program})
    }

    return {
      allPrograms,
      generateComponent
    }
  }
})
</script>