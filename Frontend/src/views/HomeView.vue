<template lang="pug">
template(v-if="userData !== undefined")
  .home-wrapper.bg-fill.p-4(
    :style="[userData.settings.useBackground === true ? {'background-image': 'url('+ getImageUrl(userData.settings?.backgroundImage) + ')'} : {'background-color': userData.settings?.backgroundColour}]")
    .desktop-container
      DesktopItem(
        v-for="program in allPrograms()"
        v-on:generateComponent="generateComponent(program)"
        :key="program.id"
        :program="program"
        :itemColor="program.color"
      )

ComponentMachine
Menu(v-if="showMenu")
Taskbar(v-on:changeShowMenu="changeShowMenu" :showMenu="showMenu")
</template>

<script setup lang="ts">
import type { IProgram, IUser } from '@/models/index'
import { ref, defineAsyncComponent } from 'vue'
import { userStore } from '@/stores/userStore'
import { storeToRefs } from 'pinia'
import { programsStore } from '@/stores/programsStore'

import ComponentMachine from '@/components/ComponentMachine.vue'
const Menu = defineAsyncComponent(() => import('@/components/menuComponents/Menu.vue'))
import Taskbar from '@/components/taskbar/Taskbar.vue'
import DesktopItem from '@/components/DesktopItem.vue'

const programsstore = programsStore()
const userstore = userStore()
const userData = storeToRefs(userstore).userData
const showMenu = ref(false)

const allPrograms = (() => programsstore.installedPrograms)

const generateComponent = (program: IProgram) => {
  programsstore.addProgramToActive({...program})
}

const getImageUrl = (filename: string) => {
  return `http://localhost:4000/uploads/${filename}`
}

const changeShowMenu = () => {
  showMenu.value = !showMenu.value
}
</script>

<style lang="sass">
.home-wrapper
  background-position: center
  background-repeat: no-repeat
  background-size: cover
  image-rendering: pixelated
</style>