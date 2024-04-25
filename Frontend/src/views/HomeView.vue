<template lang="pug">
template(v-if="userData !== undefined")
  .home-wrapper(class="flex h-full w-full absolute"
    :style="[userData.settings.useBackground === true ? {'background-image': 'url('+ getImageUrl(userData.settings?.backgroundImage) + ')'} : {'background-color': userData.settings?.backgroundColour}]")
    .desktop-container(class="flex flex-col justify-start")
      .grid.grid-cols-2.gap-y-8
        DesktopItem(
          v-for="program in allPrograms()"
          v-on:generateComponent="generateComponent(program)"
          :key="program._id"
          :program
          :itemColor="program.color"
        )

    ComponentMachine
    Menu(v-if="showMenu")
    Taskbar(v-on:changeShowMenu="changeShowMenu" :showMenu="showMenu")
//- Salvatore
//- TestStuff
//- LaCosaNostra
</template>

<script setup lang="ts">
import type { IProgram } from '@/models/index'
import { userStore } from '@/stores/userStore'
import { storeToRefs } from 'pinia'
import { programsStore } from '@/stores/programsStore'
import { useAuthStore } from '@/stores/authStore'
// import Salvatore from '@/phaser/salvatore/SalvatoreGame.vue'
//import TestStuff from '@/phaser/test-stuff/TestStuff.vue'
// import LaCosaNostra from '@/phaser/la-cosa-nostra/LaCosaNostraGame.vue'

const authstore = useAuthStore()
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
// canvas
//   z-index: 9999
//   position: absolute
</style>