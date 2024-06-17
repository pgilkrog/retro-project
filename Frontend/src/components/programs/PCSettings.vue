<template lang="pug">
WindowFrame(
  :program="program" 
  :isMoveable="true"
  :variant="program.color"
  :showMenu="false"
)
  .pc-settings-wrapper.p-4
    TabsComponent(:list="tabsList" v-on:tabClick="state = $event" :activeTab="state")
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
        v-on:clicked="saveUserInfo()"
      )
</template>

<script setup lang="ts">
import type { PropType } from 'vue'
import type { IFile, IProgram, IUser, IUserSettings } from '../../models/index'
import { userStore } from '../../stores/userStore'
import { fileStore } from '../../stores/fileStore'
import { storeToRefs } from 'pinia'

const { program } = defineProps({
  program: Object as PropType<IProgram>
})

const userstore = userStore()
const filestore = fileStore()

const state: Ref<number> = ref(0)
const color: Ref<string> = ref("")
const tempImg: Ref<IFile | undefined> = ref(undefined)
const userData = storeToRefs(userstore).userData as Ref<IUser | undefined>
const tabsList = ['Didsplay', 'Screen Saver', 'Profile']

onMounted(() => {
  color.value = userData.value?.settings?.backgroundColour ?? ''
  filestore.getAllFiles()
})

const onColorSelected = (event: any): void => {
  event.preventDefault()
  let tempData = userstore.userData
  if (tempData === undefined) return
  
  (tempData.settings as IUserSettings).backgroundColour = color.value
  userstore.setUserData(tempData)
}

const saveUserInfo = (): void => {
  let tempSettings = userData.value as IUser
  
  if (tempSettings === undefined) return

  setImage(tempImg.value)
  tempSettings.settings.backgroundColour = color.value
  userstore.updateUserSettings(tempSettings.settings as IUserSettings)
  userstore.setUserData(tempSettings)
}

const setImage = (file: IFile | undefined): void => {
  let url = file === undefined ? '' : file.name
  let temp = userData.value as IUser
  temp.settings.backgroundImage = url
  temp.settings.useBackground = file === undefined ? false : true
  userstore.setUserData(temp)
}

const setTempImg = (img: IFile): void => {
  tempImg.value = img
}

const getImageUrl = (filename: string): string => {
  return `${import.meta.env.VITE_BASE_URL}/uploads/${filename}`
}

</script>