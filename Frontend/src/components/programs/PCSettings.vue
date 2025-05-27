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

      <!-- Content for Tab 0 -->
      <div
        v-if="state === 0"
        class="content p-4 border border-t-0 border-black"
      >
        <div class="row flex flex-col items-center">
          <PCScreen :temp-img="tempImg" />
        </div>
        <div class="row mt-4">
          <BackgroundImages
            :temp-img="tempImg"
            @set-temp-img="setTempImg($event)"
          />
        </div>
        <div class="row mt-4">
          <FileUploader />
        </div>
        <div class="row mt-4">
          <div class="col">
            <p>Color:</p>
          </div>
        </div>
        <div class="row">
          <div class="col-2">
            <input
              v-model="color"
              type="color"
              @change="onColorSelected"
            />
          </div>
        </div>
      </div>

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
          @clicked="saveUserInfo()"
        />
      </div>
    </div>
  </WindowFrame>
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

onMounted(async () => {
  color.value = userData.value?.settings.backgroundColour ?? ''
  await filestore.getAllFiles()
})

const onColorSelected = (event: Event): void => {
  event.preventDefault()

  const tempData = userstore.userData
  if (tempData == undefined) return

  tempData.settings.backgroundColour = color.value
  userstore.setUserData(tempData)
}

const saveUserInfo = async () => {
  const tempSettings = userData.value

  if (tempSettings == undefined) return

  setImage(tempImg.value)
  tempSettings.settings.backgroundColour = color.value

  await userstore.updateUserSettings(tempSettings.settings)
  userstore.setUserData(tempSettings)
}

const setImage = (file: IFile | undefined) => {
  const url = file === undefined ? '' : file.name
  const tempUserData = userData.value

  if (tempUserData != undefined) {
    tempUserData.settings.backgroundImage = url
    tempUserData.settings.useBackground = file == undefined ? false : true
    userstore.setUserData(tempUserData)
  }
}

const setTempImg = (img: IFile): void => {
  tempImg.value = img
}
</script>
