<template lang="pug">
.login-screen-wrapper.center-item.text-black
  WindowFrame(
    :program="program" 
    :showMenu="false" 
    variant="info"
  )
    .d-flex.p-4
      .image.pe-4
        .rotate-90
          i.bi.bi-key-fill.text-warning
      form.d-flex.flex-column
        .row Type a user name and password to log into Windows
        .row.mt-2
          .col-3
            .login-text User name:
          .col
            input.text-black.w-100.bg-shadow-inner(type="text" autocomplete="off" name="username" v-model="username")
        .row.mt-2
          .col-3
            .login-text Password:
          .col
            input.w-100.text-black.bg-shadow-inner(type="password" name="password" autocomplete="off" v-model="password")
      .buttons.d-flex.flex-column.ps-4
        button.btn(@click="confirmLogin()") OK 
        button.btn.mt-2 Help
    div
      button.btn(@click="registerUser()") Create User
</template>

<script lang="ts">
import WindowFrame from './WindowFrame.vue'
import { userStore } from '@/stores/userStore'
import type { IProgram } from '@/models/index'

export default {
  components: {
    WindowFrame
  },
  data() {
    return {
      username: "",
      password: "",
      userstore: userStore(),
      program: {
        Id: 543, 
        Name: 'Log in now', 
        IsActive: true, 
        Image: 'bi-archive'
      } as IProgram
    }
  },
  methods: {
    confirmLogin(): void {
      this.userstore.loginUser(this.username, this.password)
    },
    registerUser(): void {
      this.userstore.registerUser(this.username, this.password)
    },
    changePassword(password: string): void {
      this.userstore.changePassword(password)
    }
  }
}
</script>