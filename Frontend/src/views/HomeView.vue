<template lang="pug">
.home-wrapper(
  class="flex h-full w-full absolute" 
  v-if="userData != undefined"
  :style="[userData.settings.useBackground === true ? {'background-image': 'url('+ getImageUrl(userData.settings?.backgroundImage) + ')'} : {'background-color': userData.settings?.backgroundColour}]"
  @mousemove="registerMouseMovement"
)
  .desktop-container(class="flex flex-col justify-start py-4")
    .shortcuts-container(v-if="allPrograms" class="grid grid-cols-2 gap-y-8")
      DesktopItem(
        v-for="program in allPrograms"
        v-on:generateComponent="generateComponent(program)"
        :key="program._id"
        :displayName="program.displayName"
        :name="program.image"
        :color="program.color"
      )
  MenuPopup(title="check" :list="dis")
  //- CarouselComponent
  ComponentMachine
  Menu(v-if="showMenu")
  Taskbar(v-on:changeShowMenu="changeShowMenu" :showMenu="showMenu")
  ScreensaverMachine(v-show="appStore.showScreensaver === true")
//- Salvatore
//- TestStuff
//- LaCosaNostra
</template>

<script setup lang="ts">
import type { IProgram } from '@/models/index'
import { userStore } from '@/stores/userStore'
import { useAppStore } from '@/stores/appStore'
import { storeToRefs } from 'pinia'
import { programsStore } from '@/stores/programsStore'
import { useAuthStore } from '@/stores/authStore'
// import Salvatore from '@/phaser/salvatore/SalvatoreGame.vue'
//import TestStuff from '@/phaser/test-stuff/TestStuff.vue'
// import LaCosaNostra from '@/phaser/la-cosa-nostra/LaCosaNostraGame.vue'
import ScreensaverMachine from '@/components/programs/ScreensaverMachine.vue'

const appStore = useAppStore()
const authstore = useAuthStore()
const programsstore = programsStore()
const userstore = userStore()

const userData = storeToRefs(userstore).userData
const showMenu = ref<boolean>(false)
const allPrograms = computed<IProgram[]>(() => programsstore.installedPrograms)

const dis = [
  {
    name: 'hej', method: () => thismehtod2(), icon: 'fa-house'
  },
  {
    name: 'dav', method: () => thismehtod(), icon: 'fa-house'
  },
  {
    name: 'check', method: (item: any) => testthistho(item), icon: 'fa-house'
  }
]

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

const registerMouseMovement = (event: any) => {
  appStore.initiateScreensaverTimer()
}

const thismehtod = () => {
  console.log("run this")
}
const thismehtod2 = () => {
  console.log("run this 2")
}
const testthistho = (item: any) => {
  appStore.thismaybe(item)
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