<template lang="pug">
template(v-if="userData !== undefined")
  .home-wrapper.bg-fill.p-4(
    :style="[userData.settings.useBackgroundImage === true ? {'background-image': 'url('+  userData.settings?.userBackgroundImage + ')'} : {'background-color': userData.settings?.backgroundColour}]")
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
import type { IProgram, IUser } from '@/models/index'
import { defineComponent } from 'vue'
import DesktopItem from '@/components/DesktopItem.vue'
import { programsStore } from '@/stores/programsStore'
import ComponentMachine from '@/components/ComponentMachine.vue'
import Loading from '@/components/Loading.vue'
import { userStore } from '@/stores/userStore'
import { storeToRefs } from 'pinia'

export default defineComponent({
  components: {
    DesktopItem,
    ComponentMachine,
    Loading
  },
  setup() {
    const programsstore = programsStore()
    const userstore = userStore()
    const userData = storeToRefs(userstore).userData

    const allPrograms = (() => programsstore.installedPrograms)
    const generateComponent = (program: IProgram) => {
      programsstore.addProgramToActive({...program})
    }

    return {
      userData,
      allPrograms,
      generateComponent
    }
  }
})
</script>

<style lang="sass">
</style>