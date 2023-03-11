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
import { defineComponent, ref } from 'vue'

export default defineComponent({
  components: {
    WindowFrame
  },
  setup () {
    const state = ref(1)
    const username = ref("" as string)
    const password = ref("" as string)
    const password2 = ref("" as string)
    const info = ref('info' as string)
    const infoText = ref('Type a email and password to log into Windows')
    const showHelp = ref(false as boolean)
    const userstore = userStore()
    const program = ref({
        Id: 543, 
        Name: 'Log in now', 
        IsActive: true, 
        Image: 'bi-archive'
      } as IProgram)

    const pressedOk = () => {
      if (state.value === 1)
        confirmLogin()
      else if (state.value === 2)
        registerUser()
      else
        changePassword()
    }

    const confirmLogin = (): void => {
      userstore.loginUser(username.value, password.value)
    }

    const registerUser = (): void => {
      if (password.value === password2.value)
        userstore.registerUser(username.value, password.value)
    }

    const changePassword = (): void => {
      userstore.changePassword(password.value)
    }
    
    const changeShowHelp = () => {
      showHelp.value = !showHelp.value
    }

    const changeState = (stateVal: number) => {
      if (stateVal === 1) {
        state.value = 1
        info.value = 'info'
        program.value.Name = 'Log in now'
        infoText.value = 'Type a email and password to log into Windows'
      } else if (stateVal === 2) {
        state.value = 2
        info.value = 'warning'
        program.value.Name = 'Register user'
        infoText.value = 'Type a email and password to create a user'
      } else if (stateVal === 3) {
        state.value = 3
        info.value = 'success'
        program.value.Name = 'Reset password'
        infoText.value = 'Type a email to send an reset email notification'
      }
    }

    return {
      state,
      username,
      info,
      infoText,
      showHelp,
      userstore,
      program,
      password,
      password2,
      pressedOk,
      confirmLogin,
      registerUser,
      changeShowHelp,
      changeState
    }
  }
})
</script>