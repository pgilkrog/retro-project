<template lang="pug">
WindowFrame(
  :program="program" 
  :isMoveable="true"
  :variant="program.color"
  :showMenu="false"
)
  .pc-settings-wrapper.p-4
    .d-flex.custom-menu
      .nav-item.py-2.px-4.pointer(@click="state = 0" :class="state === 0 ? 'active' : ''")
        | Display
      .nav-item.py-2.px-4.pointer(@click="state = 1" :class="state === 1 ? 'active' : ''")
        | Screen Saver
      .nav-item.py-2.px-4.pointer(@click="state = 2" :class="state === 2 ? 'active' : ''")
        | Profile
      .tab-fill
    .content.p-4.main-wrap.rounded(v-if="state === 0")
      .row.d-flex.flex-column.align-items-center
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
        .col
    .content.p-4.main-wrap.rounded(v-else-if="state === 1")
      .row
    .content.p-4.main-wrap.rounded(v-else-if="state === 2")
      .row
        UserInfo
    .d-flex.justify-content-end.mt-4
      button(@click="saveUserInfo()").btn.px-4.py-2 OK
</template>

<script setup lang="ts">
import { ref, onMounted, type Ref, type PropType } from 'vue'
import type { IFile, IProgram, IUser, IUserSettings } from '../../../models/index'
import { userStore } from '../../../stores/userStore'
import { fileStore } from '../../../stores/fileStore'
import { storeToRefs } from 'pinia'
import PCScreen from './PCScreen.vue'
import FileUploader from '@/components/FileUploader.vue'
import BackgroundImages from './BackgroundImages.vue'
import UserInfo from '@/components/auth/UserInfo.vue'

const props = defineProps({
  program: Object as PropType<IProgram>
})

const userstore = userStore()
const filestore = fileStore()

const state = ref<number>(0)
const color = ref<string>("")
const tempImg = ref<IFile | undefined>(undefined)
const userData = storeToRefs(userstore).userData as Ref<IUser | undefined>

onMounted(() => {
  color.value = userstore.userBackgroundColour
  filestore.getAllFiles()
})

const onColorSelected = (event: any) => {
  event.preventDefault()
  let tempData = userstore.userData
  if (tempData === undefined) return
  
  (tempData.settings as IUserSettings).backgroundColour = color.value
  userstore.setUserData(tempData)
}

const saveUserInfo = () => {
  let tempSettings = userData.value as IUser
  
  if (tempSettings === undefined) return

  setImage(tempImg.value)
  tempSettings.settings.backgroundColour = color.value
  userstore.updateUserSettings(tempSettings.settings as IUserSettings)
  userstore.setUserData(tempSettings)
}

const setImage = (file: IFile | undefined) => {
  let url = file === undefined ? '' : file.name
  let temp = userData.value as IUser
  temp.settings.backgroundImage = url
  temp.settings.useBackground = file === undefined ? false : true
  userstore.setUserData(temp)
}

const setTempImg = (img: IFile) => {
  tempImg.value = img
}

const getImageUrl = (filename: string) => {
  return `http://localhost:4000/uploads/${filename}`;
}

</script>

<style lang="sass" scope>
.main-wrap
  border-top-left-radius: 0px !important
  z-index: 10
  position: relative
  margin-top: -1px
  margin-right: -5px
</style>