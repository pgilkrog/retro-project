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
      .row
        .background-images-wrapper.d-flex
          .image-item.m-2
            img(
              height="100"
              width="100"
              src="https://st3.depositphotos.com/23594922/31822/v/600/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg"
              :class="userData.settings?.userBackgroundImage === 'undefined' || userData.settings?.userBackgroundImage === '' ? 'border border-danger' : ''"
              @click="imageClicked(undefined)"
            )
          .image-item.m-2(v-for="(item, index) in images" :key="index")
            img(
              height="100"
              width="100"
              :src="getImageUrl(item.name)"
              @click="imageClicked(item)"
              :class="userData.settings?.userBackgroundImage === item.name ? 'border border-danger' : ''"
            ).pointer
      .row
        FileUploader
      .row
        .col-1
          input(type="color" @change="onColorSelected" v-model="color")
        .col-11
      .row.pt-2
        | {{ progress }}
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
import type { IUser, IFile, IUserSettings } from '../../../models/index'
import UserInfo from '@/components/auth/UserInfo.vue'
import { storeToRefs } from 'pinia'

export default defineComponent({
  components: {
    WindowFrame,
    UserInfo,
    FileUploader
  },
  props: {
    program: Object
  },
  setup () {
    const userstore = userStore()
    const filestore = fileStore()

    const state = ref(0)
    const progress = ref(0)
    const color = ref("")
    const images = computed(() => filestore.allFiles)
    const userData = storeToRefs(userstore).userData
    const backgroundImages = computed(() => userstore.userBackgroundImage)

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

    const imageClicked = (file: IFile) => {
      let url = file === undefined ? '' : file.name
      let temp = userData.value as IUser
      temp.settings.backgroundImage = url
      temp.settings.useBackground = file === undefined ? false : true
      userstore.setUserData(temp)
    }

    const saveUserInfo = () => {
      let tempSettings = userData.value as IUser
      
      if (tempSettings === undefined) return

      tempSettings.settings.backgroundColour = color.value
      userstore.updateUserSettings(tempSettings.settings as IUserSettings)
      userstore.setUserData(tempSettings)
    }

    const changeState = (int: number) => {
      state.value = int
    }

    const getImageUrl = (filename: string) => {
      return `http://localhost:4000/uploads/${filename}`;
    }

    return {
      state,
      progress,
      userData,
      color,
      backgroundImages,
      images,
      onColorSelected,
      imageClicked,
      saveUserInfo,
      changeState,
      getImageUrl
    }
  }
})
</script>