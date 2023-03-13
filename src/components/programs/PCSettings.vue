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
        .background-images-wrapper.d-flex(v-if="backgroundImages.length > 0")
          .image-item.m-2
            img(
              height="100"
              width="100" 
              src="https://st3.depositphotos.com/23594922/31822/v/600/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg"
              :class="userData.UseBackgroundImage === 'undefined' ? 'border border-danger' : ''"
              @click="imageClicked(undefined)"
            )
          .image-item.m-2(v-for="(item, index) in backgroundImages" :key="index")
            img(
              height="100" 
              width="100" 
              :src="item.Url"
              @click="imageClicked(item)"
              :class="userData.UseBackgroundImage === item.Url ? 'border border-danger' : ''"
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
import WindowFrame from '../WindowFrame.vue'
import { defineComponent } from 'vue'
import { storage } from '../../firebase'
import {  ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage'
import DBHelper from '../../helpers/DBHelper'
import { userStore } from '../../stores/userStore'
import type { IUser, IFile } from '../../models/index'
import UserInfo from '@/components/auth/UserInfo.vue'

export default defineComponent({
  components: {
    WindowFrame,
    UserInfo
  },
  props: {
    program: Object
  },
  data() {
    return {
      state: 0,
      progress: 0,
      userstore: userStore(),
      userData: {} as IUser,
      color: "",
    }
  },
  mounted() {
    this.userData = this.userstore.getUserData
    this.color = this.userstore.getUserData.BackgroundColor
  },
  computed: {
    backgroundImages() {
      return this.userstore.getUserBackgroundImages
    }
  },
  methods: {
    async onFileSelected(e: any) {
      e.preventDefault()
      const file = e.target.files[0]
      
      if (file === undefined)
        return

      const storageRef = ref(storage, `${this.userData.Email}/${file.name}`)
      const uploadTask = uploadBytesResumable(storageRef, file)

      uploadTask.on("state_changed",
        (snapshot) => {
          const progress =
            Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
            this.progress = progress
        },
        (error) => {
          alert(error)
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            this.saveNewBackgroundURL(file.name, downloadURL, file.size, "BackgroundImage")
          });
        }
      )
    },
    onColorSelected(event: any) {
      event.preventDefault()
      this.userData.BackgroundColor = this.color
    },
    saveNewBackgroundURL(
      name: string, 
      url: string, 
      size: number, 
      type: string
    ) {
      DBHelper.getOneByUserId('users', this.userstore.getUser.uid).then((user: IUser) => {
        user.Files.push({
          Name: name,
          Url: url,
          Size: size,
          Type: type
        } as IFile)
        DBHelper.update('users', user)
      })
    },
    imageClicked(file: IFile) {
      file === undefined
        this.userData.UseBackgroundImage =file === undefined
        ? 'undefined' : file.Url
    },
    saveUserInfo() {
      DBHelper.update('users', this.userData)
      this.userstore.setUserData(this.userData)
    },
    changeState(int: number) {
      this.state = int
    }
  }
})
</script>