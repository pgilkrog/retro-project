<template lang="pug">
WindowFrame(
  :program="program" 
  :showMenu="false" 
  :variant="info"
).absolute-center
  .login-screen.row.p-2.px-4
    .col-2.text-center
      IconComponent(name="fa-key" variant="warning" size="40" rotate="0")
    .col-10.d-flex.align-items-center
      | {{ infoText }}
    .col-12
      .row.mt-4
        .col-12.col-lg-3.d-flex.align-items-center
          .login-text Email:
        .col-12.col-lg
          input.text-black.bg-shadow-inner.w-100(
            type="email" 
            autocomplete="off" 
            name="username" 
            v-model="username"
          )
      .row.mt-2(v-if="state === 2 || state === 1")
        .col-12.col-lg-3.d-flex.align-items-center
          .login-text Password:
        .col-12.col-lg
          input.text-black.bg-shadow-inner.w-100(
            type="password" 
            name="password" 
            autocomplete="off" 
            v-model="password"
          )
      .row.mt-2(v-if="state === 2")
        .col-12.col-lg-3.d-flex.align-items-center
          .login-text Password:
        .col-12.col-lg
          input.text-black.bg-shadow-inner.w-100(
            type="password" 
            name="password" 
            autocomplete="off" 
            v-model="password2"
          )
    .col-12.mt-4.d-flex.justify-content-center
      button.btn.btn-wide.me-2(@click="pressedOk()") OK 
      button.btn.btn-wide(@click="changeShowHelp()") Help
  .d-flex.flex-column.bg-shadow-inner.p-4.m-2(v-if="showHelp === true")
    p Some helping info and stuff
    .d-flex.justify-content-center.mt-4
      button.btn.me-4(@click="changeState(2)" v-if="state === 1") Create User
      button.btn.me-4(@click="changeState(1)" v-else) Login
      button.btn(@click="changeState(3)") Forgot password
      
</template>

<script lang="ts">
import WindowFrame from '@/components/windowframe/WindowFrame.vue'
import { authStore } from '@/stores/authStore'
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
    const infoText = ref('Type a email and password to log in')
    const showHelp = ref(false as boolean)
    const authstore = authStore()
    const program = ref({
        name: 'LogInNow', 
        isActive: true, 
        image: 'bi-archive',
        displayName: 'Log in now',
        color: 'light'
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
      authstore.loginUser(username.value, password.value)
    }

    const registerUser = (): void => {
      if (password.value === password2.value)
        authstore.registerUser(username.value, password.value)
    }

    const changePassword = (): void => {
      authstore.changePassword(password.value)
    }
    
    const changeShowHelp = () => {
      showHelp.value = !showHelp.value
    }

    const changeState = (stateVal: number) => {
      if (stateVal === 1) {
        state.value = 1
        info.value = 'info'
        program.value.name = 'Log in now'
        infoText.value = 'Type a email and password to log into Windows'
      } else if (stateVal === 2) {
        state.value = 2
        info.value = 'warning'
        program.value.name = 'Register user'
        infoText.value = 'Type a email and password to create a user'
      } else if (stateVal === 3) {
        state.value = 3
        info.value = 'success'
        program.value.name = 'Reset password'
        infoText.value = 'Type a email to send an reset email notification'
      }
    }

    return {
      state,
      username,
      info,
      infoText,
      showHelp,
      authstore,
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

<style lang="sass" scoped>
.login-screen
  max-width: 600px
</style>