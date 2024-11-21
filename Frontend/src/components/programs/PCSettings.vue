<template lang="pug">
WindowFrame(
  :program="program" 
  :isMoveable="true"
  :variant="program.color"
  :showMenu="false"
)
  .pc-settings-wrapper.p-4
    TabsComponent(:list="tabsList" @tabClick="state = $event" :activeTab="state")
    .content(v-if="state === 0" class="p-4 rounded-b border border-t-0 border-black")
      .row.flex.flex-col.items-center
        PCScreen(:tempImg="tempImg")
      .row.mt-4
        BackgroundImages(@setTempImg="setTempImg($event)" :tempImg="tempImg")
      .row.mt-4
        FileUploader
      .row.mt-4
        .col
          p Color:
      .row
        .col-2
          input(
            type="color" 
            @change="onColorSelected" 
            v-model="color"
          )
    .content.p-4.main-wrap(v-else-if="state === 1" class="p-4 rounded-b border border-t-0 border-black")
      .row
    .content.p-4.main-wrap(v-else-if="state === 2" class="p-4 rounded-b border border-t-0 border-black")
      .row
        UserInfo
    .d-flex.justify-content-end.mt-4
      ButtonComponent(
        text="OK" 
        @clicked="saveUserInfo()"
      )
</template>

<script setup lang="ts">
import type { IFile, IProgram } from '../../models/index'
import { userStore } from '../../stores/userStore'
import { fileStore } from '../../stores/fileStore'
import { storeToRefs } from 'pinia'

const { program } = defineProps<{
  program: IProgram
}>()

const userstore = userStore()
const filestore = fileStore()
const { userData } = storeToRefs(userstore)

const state = ref<number>(0)
const color = ref<string>('')
const tempImg = ref<IFile | undefined>()
const tabsList: string[] = ['Display', 'Screen Saver', 'Profile']

onMounted(() => {
  color.value = userData.value?.settings?.backgroundColour ?? ''
  filestore.getAllFiles()
})

const onColorSelected = (event: Event): void => {
  event.preventDefault()

  let tempData = userstore.userData
  if (tempData === undefined) return

  tempData.settings.backgroundColour = color.value
  userstore.setUserData(tempData)
}

const saveUserInfo = (): void => {
  let tempSettings = userData.value

  if (tempSettings === undefined) return

  setImage(tempImg.value)
  tempSettings.settings.backgroundColour = color.value

  userstore.updateUserSettings(tempSettings.settings)
  userstore.setUserData(tempSettings)
}

const setImage = (file: IFile | undefined): void => {
  let url = file === undefined ? '' : file.name
  let tempUserData = userData.value

  if (tempUserData !== undefined) {
    tempUserData.settings.backgroundImage = url
    tempUserData.settings.useBackground = file === undefined ? false : true
    userstore.setUserData(tempUserData)
  }
}

const setTempImg = (img: IFile): void => {
  tempImg.value = img
}

const getImageUrl = (filename: string): string => {
  return `${import.meta.env.VITE_BASE_URL}/uploads/${filename}`
}
</script>
