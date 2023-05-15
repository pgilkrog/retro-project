<template lang="pug">
.home-wrapper.bg-fill.p-4(:style="[useBackgroundImage === true ? {'background-image': 'url('+ userBackgroundImage + ')'} : {'background-color': userBackgroundColor}]")
  .desktop-container.d-flex.flex-column
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
import { defineComponent, computed } from 'vue'
import DesktopItem from '@/components/DesktopItem.vue'
import { programsStore } from '@/stores/programsStore'
import ComponentMachine from '@/components/ComponentMachine.vue'
import Loading from '@/components/Loading.vue'
import { userStore } from '@/stores/userStore'

export default defineComponent({
  components: {
    DesktopItem,
    ComponentMachine,
    Loading
  },
  setup() {
    const programsstore = programsStore()

    const userstore = userStore()
    const useBackgroundImage = computed(() => userstore.getUseBackgroundImage)    
    const userBackgroundImage = computed(() => userstore.getUserBackgroundImage)
    const userBackgroundColor = computed(() => userstore.getUserBackgroundColour)

    const allPrograms = (() => programsstore.getInstalledPrograms)

    const generateComponent = (program: IProgram) => {
      programsstore.addProgramToActive({...program})
    }

    return {
      useBackgroundImage,
      userBackgroundImage,
      userBackgroundColor,
      allPrograms,
      generateComponent
    }
  }
})
</script>