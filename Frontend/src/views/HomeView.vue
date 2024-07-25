<template lang="pug">
.home-wrapper(
  v-if="userData != undefined"
  class="flex h-full w-full absolute bg-center bg-no-repeat bg-cover" 
  :style="[userData.settings.useBackground === true ? {'background-image': 'url('+ getImageUrl(userData.settings?.backgroundImage) + ')'} : {'background-color': userData.settings?.backgroundColour}]"
  @mousemove="registerMouseMovement"
  @click="console.log('DODIA')"
  @contextmenu="showContextMenu = true"
)
  DesktopGrid(:list="checkThis" :allPrograms="allPrograms")
    template(v-slot:listItem="program") 
      DesktopItem(
        v-if="program.listItem !== undefined"
        v-on:generate-component="generateComponent(program.listItem)"
        :key="program.listItem._id"
        v-bind="program.listItem"
      )
  .context-menu(v-show="showContextMenu" )
    .menu(class="bg-gray-200 p-2 rounded bg-shadow absolute")
      p hejsa
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
import { programsStore } from '@/stores/programsStore'
import { useAuthStore } from '@/stores/authStore'
// import Salvatore from '@/phaser/salvatore/SalvatoreGame.vue'
// import TestStuff from '@/phaser/test-stuff/TestStuff.vue'
// import LaCosaNostra from '@/phaser/la-cosa-nostra/LaCosaNostraGame.vue'
import ScreensaverMachine from '@/components/programs/ScreensaverMachine.vue'

const appStore = useAppStore()
const authstore = useAuthStore()
const programsstore = programsStore()
const userstore = userStore()

const userData = computed(() => userstore.userData)
const showMenu = ref<boolean>(false)
const allPrograms = computed<IProgram[]>(() => programsstore.installedPrograms)
const showContextMenu = ref(false)

const checkThis = ref<any[]>([])

onMounted(async () => {
  if (authstore.isLoggedIn === true) {
    await programsstore.init()
    await userstore.getUserById()
  }

  checkThis.value = [...allPrograms.value]
  const disLength = checkThis.value.length
  for(let i = 0; (i+disLength) < 99; i++) {
    checkThis.value.push(undefined)
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

const registerMouseMovement = (event: any): void => {
  appStore.initiateScreensaverTimer()
}

</script>

<style lang="sass">
// canvas
//   z-index: 9999
//   position: absolute
</style>