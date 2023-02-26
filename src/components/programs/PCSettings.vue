<template lang="pug">
WindowFrame(:program="program" :isMoveable="true")
  .pc-settings-wrapper.p-4
    input(type="file" @change="onFileSelected")
  .wrap 
   | {{ progress }}
</template>

<script lang="ts">
import WindowFrame from '../WindowFrame.vue'
import { defineComponent } from 'vue'
import { storage } from '../../firebase'
import {  ref, getDownloadURL, uploadBytesResumable } from "firebase/storage"
import DBHelper from '../../helpers/DBHelper'
import { userStore } from '../../stores/userStore'
import type { IUser, IFile } from '../../models/index'

export default defineComponent({
  components: {
    WindowFrame
  },
  props: {
    program: Object
  },
  data() {
    return {
      progress: 0,
      userstore: userStore(),
      userData: {} as IUser
    }
  },
  mounted() {
    this.userData = this.userstore.getUserData
  },
  methods: {
    async onFileSelected(e: any) {
      e.preventDefault()
      console.log(e)
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
    saveNewBackgroundURL(name: string, url: string, size: number, type: string) {
      DBHelper.getOneByUserId('users', this.userstore.getUser.uid).then((user: IUser) => {
        debugger
        user.Files.push({
          Name: name,
          Url: url,
          Size: size,
          Type: type
        } as IFile)
        DBHelper.update('users', user)
      })
    }
  }
})
</script>