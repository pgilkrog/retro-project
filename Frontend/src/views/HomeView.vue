<template lang="pug">
.home-wrapper(
  class="flex h-full flex-col w-full absolute" 
  v-if="userData != undefined"
  :style="[userData.settings.useBackground === true ? {'background-image': 'url('+ getImageUrl(userData.settings?.backgroundImage) + ')'} : {'background-color': userData.settings?.backgroundColour}]"
)
  .desktop-container(class="flex flex-col justify-start py-4")
    .grid.grid-cols-2.gap-y-8(v-if="allPrograms")
      DesktopItem(
        v-for="program in allPrograms"
        v-on:generateComponent="generateComponent(program)"
        :key="program._id"
        :program
        :itemColor="program.color"
      )
  CarouselComponent
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
import 'vue3-carousel/dist/carousel.css'

const authstore = useAuthStore()
const programsstore = programsStore()
const userstore = userStore()

const userData = storeToRefs(userstore).userData
const showMenu = ref<boolean>(false)
const allPrograms = computed<IProgram[]>(() => programsstore.installedPrograms)

onMounted(async () => {
  if (authstore.isLoggedIn === true) {
    await programsstore.init()
    await userstore.getUserById()
  }
})

const generateComponent = (program: IProgram): void => {
  programsstore.addProgramToActive({...program})
}

const getImageUrl = (filename: string): string => {
  return `${import.meta.env.VITE_BASE_URL}/uploads/${filename}`
}

const changeShowMenu = (): void => {
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