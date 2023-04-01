<template lang="pug">
WindowFrame(:program="program" :isMoveable="true")
  .pc-settings-wrapper.p-4
    .d-flex
      .nav-item.active.py-2.px-4(@click="changeState(0)")
        | Display
      .nav-item.py-2.px-4(@click="changeState(1)")
        | Profile
      .tab-fill
    .content.p-4(v-if="state === 0")
      .row
        .background-images-wrapper.d-flex()
          .image-item.m-2
            img(
              height="100"
              width="100" 
              src="https://st3.depositphotos.com/23594922/31822/v/600/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg"
              :class="backgroundInUse === 'undefined' || backgroundInUse === '' ? 'border border-danger' : ''"
              @click="imageClicked(undefined)"
            )
          .image-item.m-2(v-for="(item, index) in backgroundImages" :key="index")
            img(
              height="100" 
              width="100" 
              :src="item.Url"
              @click="imageClicked(item)"
              :class="backgroundInUse === item.Url ? 'border border-danger' : ''"
            ).pointer
      .row
        input(type="file" @change="onFileSelected")
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
import WindowFrame from '../../WindowFrame.vue'
import { defineComponent, ref, computed, onMounted } from 'vue'
import DBHelper from '../../../helpers/DBHelper'
import { userStore } from '../../../stores/userStore'
import type { IUser, IFile } from '../../../models/index'
import UserInfo from '@/components/auth/UserInfo.vue'
import { onFileSelected } from '@/helpers/Fileupload'
import { authStore } from '@/stores/authStore'

export default defineComponent({
  components: {
    WindowFrame,
    UserInfo
  },
  props: {
    program: Object
  },
  setup () {
    const authstore = authStore()
    const userstore = userStore()

    const state = ref(0)
    const progress = ref(0)
    const color = ref("")
    const userData = computed(() => userstore.getUserData)
    const backgroundImages = computed(() => userstore.getUserBackgroundImage)
    const backgroundInUse = computed(() => userstore.getUseBackgroundImage)

    onMounted(() => {
      color.value = userstore.getUserData.settings.backgroundColour
    })

    const onColorSelected = (event: any) => {
      event.preventDefault()
      let tempData = userstore.getUserData
      tempData.settings.backgroundColour = color.value
      userstore.setUserData(tempData)
    }

    const saveNewBackgroundURL = (
      name: string,
      url: string,
      size: number,
      type: string
    ) => {
      DBHelper.getOneByUserId('users',  authstore.getUser.id).then((user: IUser) => {
        user.files.push({
          Name: name,
          Url: url,
          Size: size,
          Type: type
        } as IFile)
        DBHelper.update('users', user)
      })
    }

    const imageClicked = (file: IFile) => {
      let url = file === undefined ? 'undefined' : file.Url
      let temp = userData.value
      temp.settings.backgroundImage = url
      userstore.setUserData(temp)
      userstore.setUserBackgroundImage(url)
    }

    const saveUserInfo = () => {
      // DBHelper.update('users', userData.value)
      let tempSettings = userData.value
      tempSettings.settings.backgroundColour = color.value
      userstore.updateUserSettings(tempSettings.settings)
      userstore.setUserData(tempSettings)
    }

    const changeState = (int: number) => {
      state.value = int
    }

    return {
      state,
      progress,
      userData,
      color,
      backgroundImages,
      backgroundInUse,
      onFileSelected,
      onColorSelected,
      saveNewBackgroundURL,
      imageClicked,
      saveUserInfo,
      changeState
    }
  }
})
</script>