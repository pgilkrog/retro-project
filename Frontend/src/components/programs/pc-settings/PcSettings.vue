<template>
  <WindowFrame
    :program="program"
    :is-moveable="true"
    :variant="program.color"
    :show-menu="false"
  >
    <div class="pc-settings-wrapper p-4">
      <TabsComponent
        :list="tabsList"
        :active-tab="state"
        @tab-click="state = $event"
      />

      <DisplaySettings
        v-if="state === 0"
        @set-temp-img="(image: IFile | undefined) => (tempImg = image)"
      />

      <!-- Content for Tab 1 -->
      <div
        v-else-if="state === 1"
        class="content p-4 main-wrap border border-t-0 border-black"
      >
        <div class="row" />
      </div>

      <!-- Content for Tab 2 -->
      <div
        v-else-if="state === 2"
        class="content p-4 main-wrap border border-t-0 border-black"
      >
        <div class="row">
          <UserInfo />
        </div>
      </div>

      <div class="d-flex justify-end mt-4">
        <ButtonComponent
          text="OK"
          @clicked="() => saveUserInfo()"
        />
      </div>
    </div>
  </WindowFrame>
</template>
<script setup lang="ts">
import type { IFile, IProgram } from '../../../models/index'
import { userStore } from '../../../stores/userStore'
import { fileStore } from '../../../stores/fileStore'
import { storeToRefs } from 'pinia'
import DisplaySettings from './DisplaySettings.vue'

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

onMounted(async () => {
  await filestore.getFilesByUserId(userData.value?._id)

  tempImg.value =
    userData.value?.settings.backgroundImage != undefined
      ? filestore.userFiles.find((file) => file.name === userData.value?.settings.backgroundImage)
      : undefined
})

const saveUserInfo = async () => {
  if (userData.value == undefined) {
    return
  }

  const tempSettings = { ...userData.value }

  setImage(tempImg.value)
  tempSettings.settings.backgroundColour = color.value

  await userstore.updateUserSettings(tempSettings.settings)
  userstore.setUserData(tempSettings)
}

const setImage = (file: IFile | undefined) => {
  const url = file == undefined ? '' : file.name

  if (userData.value == undefined) {
    return
  }

  const tempUserData = { ...userData.value }

  tempUserData.settings.backgroundImage = url
  tempUserData.settings.useBackground = file == undefined ? false : true
  userstore.setUserData(tempUserData)
}
</script>
