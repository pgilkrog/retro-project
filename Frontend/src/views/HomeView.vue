<template>
  <div 
    v-if="userData != undefined" 
    class="home-wrapper flex h-full w-full absolute bg-center bg-no-repeat bg-cover overflow-hidden" 
    :style="[userData.settings.useBackground === true ? {'background-image': 'url('+ getImageUrl(userData.settings?.backgroundImage) + ')'} : {'background-color': userData.settings?.backgroundColour}]" 
    @mousemove="registerMouseMovement" 
    @click="console.log('DODIA')" 
    @contextmenu="rightClick()"
  >
    <DesktopGrid 
      :list="positionedList" 
    >
      <template #listItem="program">
        <DesktopItem 
          v-if="program.listItem !== undefined" 
          :key="program.listItem._id" 
          :id="program.id"
          v-bind="program.listItem" 
          @generate-component="generateComponent(program.listItem)" 
        />
      </template>
    </DesktopGrid>
    
    <div 
      v-show="showContextMenu" 
      class="context-menu"
    >
      <div class="menu bg-gray-200 p-2 rounded bg-shadow absolute">
        <p>hejsa</p>
      </div>
    </div>
    
    <!-- CarouselComponent -->
    <ComponentMachine />
    <Menu v-if="showMenu" />
    <Taskbar 
      @change-show-menu="changeShowMenu" 
      :show-menu="showMenu" 
    />
    <ScreensaverMachine v-show="appStore.showScreensaver === true" />
    <!-- Salvatore -->
    <!-- TestStuff -->
    <!-- LaCosaNostra -->
    <!-- Game -->
  </div>
</template>

<script setup lang="ts">
import type { IProgram, IInstalledProgram } from '@/models/index'
import { userStore } from '@/stores/userStore'
import { useAppStore } from '@/stores/appStore'
import { programsStore } from '@/stores/programsStore'
import { useAuthStore } from '@/stores/authStore'
// import Salvatore from '@/phaser/salvatore/SalvatoreGame.vue'
// import TestStuff from '@/phaser/test-stuff/TestStuff.vue'
// import LaCosaNostra from '@/phaser/la-cosa-nostra/LaCosaNostraGame.vue'
// import Game from '@/phaser/space-invaders/SpaceInvaders.vue'
import ScreensaverMachine from '@/components/programs/ScreensaverMachine.vue'

const appStore = useAppStore()
const authstore = useAuthStore()
const programsstore = programsStore()
const userstore = userStore()

const userData = computed(() => userstore.userData)
const showMenu = ref<boolean>(false)
const positionedList = computed<IInstalledProgram[]>(() => programsstore.positionedList)
const showContextMenu = ref(false)

onMounted(async () => {
  if (authstore.isLoggedIn === true) {
    await programsstore.init()
    await userstore.getUserById()
    programsstore.generateGridPositions()
  }
})

const generateComponent = (program: IProgram): void => {
  programsstore.addProgramToActive({ ...program })
}

const getImageUrl = (filename: string): string => {
  return `${import.meta.env.VITE_BASE_URL}/uploads/${filename}`
}

const changeShowMenu = (): void => {
  showMenu.value = !showMenu.value
}

const registerMouseMovement = (): void => {
  appStore.initiateScreensaverTimer()
}


const rightClick = () => {
  console.log('right clicked')
  showContextMenu.value = true
}
</script>