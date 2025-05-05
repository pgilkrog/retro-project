<template>
  <div
    v-if="userData != undefined"
    class="home-wrapper flex h-full w-full absolute bg-center bg-no-repeat bg-cover overflow-hidden"
    :style="[
      userData?.settings?.useBackground === true
        ? { 'background-image': 'url(' + getImageUrl(userData?.settings?.backgroundImage) + ')' }
        : { 'background-color': userData?.settings?.backgroundColour },
    ]"
    @mousemove="registerMouseMovement"
    @click="leftClick()"
    @contextmenu="rightClick($event)"
  >
    <DesktopGrid :list="positionedList">
      <template #listItem="program">
        <DesktopItem
          v-if="program.listItem != undefined"
          :key="program.listItem._id"
          :id="program.id"
          v-bind="program.listItem"
          @generate-component="generateComponent(program.listItem)"
        />
      </template>
    </DesktopGrid>

    <ContextMenu
      v-if="showContextMenu === true"
      :position="contextMenuPosition"
    />

    <ComponentMachine />
    <MenuPopup
      :list="[
        {
          name: 'hej',
          method: () => {
            thismehtod2()
          },
          icon: 'fa-house',
        },
        {
          name: 'dav',
          method: () => {
            thismethod()
          },
          icon: 'fa-house',
        },
        {
          name: 'check',
          method: (item: object) => {
            appStore.thismaybe(item)
          },
          icon: 'fa-house',
        },
      ]"
    />
    <TaskbarMenu v-if="showMenu === true" />
    <TaskbarComponent
      :show-menu="showMenu"
      @change-show-menu="changeShowMenu"
    />
    <ScreensaverMachine v-show="appStore.showScreensaver === true" />
    <!-- CarouselComponent -->
    <!-- <Salvatore /> -->
    <!-- TestStuff -->
    <!-- LaCosaNostra -->
    <!-- Game -->
    <!-- <PingPong /> -->
    <!-- <Platformer /> -->
  </div>
</template>

<script setup lang="ts">
import type { IProgram, IInstalledProgram } from '@/models/index'
import { userStore } from '@/stores/userStore'
import { useAppStore } from '@/stores/appStore'
import { programsStore } from '@/stores/programsStore'
import ScreensaverMachine from '@/components/programs/ScreensaverMachine.vue'
// import Platformer from '@/phaser/first-game/Platformer.vue'
// import Salvatore from '@/phaser/salvatore/SalvatoreGame.vue'
// import TestStuff from '@/phaser/test-stuff/TestStuff.vue'
// import LaCosaNostra from '@/phaser/la-cosa-nostra/LaCosaNostraGame.vue'
// import Game from '@/phaser/space-invaders/SpaceInvaders.vue'
// import PingPong from '@/phaser/ping-pong/PingPong.vue'
// import Platformer from '@/phaser/first-game/Platformer.vue'
// import Platformer from '@/phaser/ShooterPlatformer/ShooterPlatformer.vue'

const appStore = useAppStore()
const programsstore = programsStore()
const userstore = userStore()

const userData = computed(() => userstore.userData)
const showMenu = ref<boolean>(false)
const positionedList = computed<IInstalledProgram[]>(() => programsstore.positionedList)
const showContextMenu = ref(false)
const contextMenuPosition = ref<{ x: number; y: number }>({ x: 0, y: 0 })

onMounted(async () => {
  await programsstore.init()
})

const generateComponent = (program: IProgram): void => {
  programsstore.addProgramToActive({ ...program })
}

const getImageUrl = (filename: string): string => {
  return `${import.meta.env.VITE_BASE_URL}/uploads/${filename}`
}

const thismethod = () => {
  console.log('thismethod')
}

const thismehtod2 = () => {
  console.log('thismehtod2')
}

const changeShowMenu = (): void => {
  showMenu.value = !showMenu.value
}

const registerMouseMovement = (): void => {
  appStore.initiateScreensaverTimer()
}

const leftClick = (): void => {
  showContextMenu.value = false
}

const rightClick = (event: MouseEvent): void => {
  showContextMenu.value = true
  contextMenuPosition.value = {
    x: event.x,
    y: event.y,
  }
}
</script>
