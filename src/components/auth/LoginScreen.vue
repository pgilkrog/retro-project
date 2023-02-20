<template lang="pug">
.login-screen-wrapper.center-item.text-black
  WindowFrame(
    :program="program" 
    :showMenu="false" 
    :variant="info"
  )
    .d-flex.p-4
      .image.pe-4
        .rotate-90
          i.bi.bi-key-fill.text-warning
      form.d-flex.flex-column
        .row {{ infoText }}
        .row.mt-4
          .col-3
            .login-text Email:
          .col
            input.text-black.w-100.bg-shadow-inner(
              type="text" 
              autocomplete="off" 
              name="username" 
              v-model="username"
            )
        .row.mt-2(v-if="state === 2 || state === 1")
          .col-3
            .login-text Password:
          .col
            input.w-100.text-black.bg-shadow-inner(
              type="password" 
              name="password" 
              autocomplete="off" 
              v-model="password"
            )
        .row.mt-2(v-if="state === 2")
          .col-3
            .login-text Password:
          .col
            input.w-100.text-black.bg-shadow-inner(
              type="password" 
              name="password" 
              autocomplete="off" 
              v-model="password2"
            )
      .buttons.d-flex.flex-column.ps-4
        button.btn(@click="pressedOk()") OK 
        button.btn.mt-2(@click="changeShowHelp()") Help
    .d-flex.flex-column.bg-shadow-inner.p-4.m-2(v-if="showHelp === true")
      p Some helping info and stuff
      .d-flex.justify-content-center.mt-4
        button.btn.me-4(@click="changeState(2)" v-if="state === 1") Create User
        button.btn.me-4(@click="changeState(1)" v-else) Login
        button.btn(@click="changeState(3)") Forgot password
        
</template>

<script lang="ts">
import WindowFrame from '../WindowFrame.vue'
import { userStore } from '@/stores/userStore'
import type { IProgram } from '@/models/index'
import { defineComponent } from 'vue'

export default defineComponent({
  components: {
    WindowFrame
  },
  data() {
    return {
      state: 1,
      username: "" as string,
      password: "" as string,
      password2: "" as string,
      info: 'info' as string,
      infoText: 'Type a email and password to log into Windows',
      showHelp: false as boolean,
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
    pressedOk() {
      if (this.state === 1)
        this.confirmLogin()
      else if (this.state === 2)
        this.registerUser()
      else
        this.changePassword()
    },
    confirmLogin(): void {
      this.userstore.loginUser(this.username, this.password)
    },
    registerUser(): void {
      if (this.password === this.password2)
        this.userstore.registerUser(this.username, this.password)
    },
    changePassword(): void {
      this.userstore.changePassword(this.password)
    },
    changeShowHelp() {
      this.showHelp = !this.showHelp
    },
    changeState(state: number) {
      if (state === 1) {
        this.state = 1
        this.info = 'info'
        this.program.Name = 'Log in now'
        this.infoText = 'Type a email and password to log into Windows'
      } else if (state === 2) {
        this.state = 2
        this.info = 'warning'
        this.program.Name = 'Register user'
        this.infoText = 'Type a email and password to create a user'
      } else if (state === 3) {
        this.state = 3
        this.info = 'success'
        this.program.Name = 'Reset password'
        this.infoText = 'Type a email to send an reset email notification'
      }
    }
  }
})
</script>