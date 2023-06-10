<template lang="pug">
WindowFrame(
  :program="program" 
  :isMoveable="true"
  :variant="program.color"
  :showMenu="false"
)
  .pc-settings-wrapper.p-4
    .d-flex
      .nav-item.py-2.px-4(@click="changeState(0)" :class="state === 0 ? 'active' : ''")
        | Display
      .nav-item.py-2.px-4(@click="changeState(1)" :class="state === 1 ? 'active' : ''")
        | Profile
      .tab-fill
    .content.p-4(v-if="state === 0")
      .row.d-flex.flex-column.align-items-center
        .bg-shadow.p-4.fit-content
          .bg-shadow-inner.img-box(
            :style="[{'background-color': userData.settings?.backgroundColour}]"
          )
            img(
              v-if="tempImg.name"
              height="192"
              width="292"
              :src="getImageUrl(tempImg.name)"
              style="margin-top: 2px; margin-left: 2px;"
            )
        .bg-shadow(style="width: 150px; height: 10px;")
        .bg-shadow(style="width: 120px; height: 20px;")
        .bg-shadow(style="width: 250px; height: 10px;")
      .row.mt-4
        BackgroundImages(@setTempImg="setTempImg($event)")
      .row
        FileUploader
      .row
        .col-2
          input(type="color" @change="onColorSelected" v-model="color")
        .col
    .content.p-4(v-else-if="state === 1")
      .row
        UserInfo
    .d-flex.justify-content-end.mt-4
      button(@click="saveUserInfo()").btn.px-4.py-2 OK
</template>

<script lang="ts">
import WindowFrame from '@/components/windowframe/WindowFrame.vue'
import FileUploader from '@/components/FileUploader.vue'
import { defineComponent, ref, computed, onMounted } from 'vue'
import { userStore } from '../../../stores/userStore'
import { fileStore } from '../../../stores/fileStore'
import type { IFile, IUser, IUserSettings } from '../../../models/index'
import UserInfo from '@/components/auth/UserInfo.vue'
import { storeToRefs } from 'pinia'
import BackgroundImages from './BackgroundImages.vue'

export default defineComponent({
  components: {
    WindowFrame,
    UserInfo,
    FileUploader,
    BackgroundImages
  },
  props: {
    program: Object
  },
  setup () {
    const userstore = userStore()
    const filestore = fileStore()

    const state = ref(0)
    const color = ref("")
    const tempImg = ref({})
    const userData = storeToRefs(userstore).userData

    onMounted(() => {
      console.log('sdfhj', userData.value)
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

      setImage(tempImg.value as IFile)
      tempSettings.settings.backgroundColour = color.value
      userstore.updateUserSettings(tempSettings.settings as IUserSettings)
      userstore.setUserData(tempSettings)
    }

    const setImage = (file: IFile) => {
      let url = file === undefined ? '' : file.name
      let temp = userData.value as IUser
      temp.settings.backgroundImage = url
      temp.settings.useBackground = file === undefined ? false : true
      userstore.setUserData(temp)
    }

    const changeState = (int: number) => {
      state.value = int
    }

    const setTempImg = (img: IFile) => {
      tempImg.value = img
    }

    const getImageUrl = (filename: string) => {
      return `http://localhost:4000/uploads/${filename}`;
    }

    return {
      state,
      userData,
      color,
      tempImg,
      setImage,
      onColorSelected,
      saveUserInfo,
      changeState,
      getImageUrl,
      setTempImg
    }
  }
})
</script>

<style lang="sass" scope>
.img-box
  width: 300px
  height: 200px
</style>