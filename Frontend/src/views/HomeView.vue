<template>
  <div
    v-if="userData != undefined"
    class="home-wrapper flex h-full w-full absolute bg-center bg-no-repeat bg-cover overflow-hidden"
    :style="[
      userData.settings?.useBackground === true
        ? { 'background-image': 'url(' + getImageUrl(userData.settings?.backgroundImage) + ')' }
        : { 'background-color': userData.settings?.backgroundColour },
    ]"
    @mousemove="registerMouseMovement"
    @click="leftClick()"
    @contextmenu="rightClick($event)"
  >
    <DesktopGrid
      :list="positionedList"
      @item-clicked="
        (installedProgram: IInstalledProgram) => handleItemClicked(installedProgram.program)
      "
    >
      <template #listItem="program">
        <DesktopItem
          v-if="program.listItem != undefined"
          :key="program.listItem._id"
          :class="{ 'border-2 border-gray-300 p-2': activeItem?._id === program.listItem._id }"
          v-bind="program.listItem"
          :background-color="userData.settings?.backgroundColour"
        />
      </template>
    </DesktopGrid>

    <ContextMenu
      v-if="showContextMenu === true"
      :position="contextMenuPosition"
    />

    <MenuPopup
      :list="appStore.myList"
      title="min titel"
    />
    <TaskbarMenu v-if="showMenu === true" />
    <TaskbarComponent
      :show-menu="showMenu"
      @change-show-menu="changeShowMenu"
    />
    <ScreensaverMachine v-show="appStore.showScreensaver === true" />
    <ComponentMachine />
  </div>
</template>

<script setup lang="ts">
import type { IProgram, IInstalledProgram } from '@/models/index'
import { userStore } from '@/stores/userStore'
import { useAppStore } from '@/stores/appStore'
import { programsStore } from '@/stores/programsStore'
import { storeToRefs } from 'pinia'

const appStore = useAppStore()
const programsstore = programsStore()
const userstore = userStore()

const showMenu = ref<boolean>(false)
const positionedList = computed<IInstalledProgram[]>(() => programsstore.positionedList)
const showContextMenu = ref<boolean>(false)
const contextMenuPosition = ref<{ x: number; y: number }>({ x: 0, y: 0 })
const activeItem = ref<IProgram | undefined>()

const { userData } = storeToRefs(userstore)

onMounted(async () => {
  await programsstore.programStoreInit()
})

const handleItemClicked = (program: IProgram | undefined): void => {
  if (program === activeItem.value && program != undefined) {
    programsstore.addProgramToActive({ ...program })
  }

  activeItem.value = program
}

const getImageUrl = (filename: string): string => {
  return `${import.meta.env.VITE_BASE_URL}/uploads/${filename}`
}

// const thismethod = () => {
//   console.log('thismethod')
// }

// const thismehtod2 = () => {
//   console.log('thismehtod2')
// }

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
