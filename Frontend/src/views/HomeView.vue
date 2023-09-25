<template lang="pug">
template(v-if="userData !== undefined")
  .home-wrapper.bg-fill.p-4(
    :style="[userData.settings.useBackground === true ? {'background-image': 'url('+ getImageUrl(userData.settings?.backgroundImage) + ')'} : {'background-color': userData.settings?.backgroundColour}]")
    .desktop-container
      DesktopItem(
        v-for="program in allPrograms()"
        v-on:generateComponent="generateComponent(program)"
        :key="program._id"
        :program="program"
        :itemColor="program.color"
      )

ComponentMachine
Menu(v-if="showMenu")
Taskbar(v-on:changeShowMenu="changeShowMenu" :showMenu="showMenu")
</template>

<script setup lang="ts">
import type { IProgram, IUser } from '@/models/index'
import { ref, defineAsyncComponent, onMounted } from 'vue'
import { userStore } from '@/stores/userStore'
import { storeToRefs } from 'pinia'
import { programsStore } from '@/stores/programsStore'
import ComponentMachine from '@/components/ComponentMachine.vue'
import Taskbar from '@/components/taskbar/Taskbar.vue'
import DesktopItem from '@/components/DesktopItem.vue'
import { authStore } from '@/stores/authStore'
const Menu = defineAsyncComponent(() => import('@/components/menuComponents/Menu.vue'))

const authstore = authStore()
const programsstore = programsStore()
const userstore = userStore()
const userData = storeToRefs(userstore).userData
const showMenu = ref(false)

onMounted(async () => {
  if (authstore.isLoggedIn) {
    await programsstore.init()
    await userstore.getUserById().then((data) => {
      if (data !== undefined)
        programsstore.setInstalledPrograms(data.installedPrograms)
    })    
  }
})

const allPrograms = (() => programsstore.installedPrograms)

const generateComponent = (program: IProgram) => {
  programsstore.addProgramToActive({...program})
}

const getImageUrl = (filename: string) => {
  return `${import.meta.env.VITE_BASE_URL}/uploads/${filename}`
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