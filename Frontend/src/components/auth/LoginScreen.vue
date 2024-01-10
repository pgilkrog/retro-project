<template lang="pug">
WindowFrame(
  :program="program" 
  :showMenu="false" 
  :variant="red"
)
  .login-screen.grid.py-2.px-4
    .col-span-4.text-center
      IconComponent(name="fa-key" variant="yellow" size="30" rotate="0")
    .col-span-8.flex.items-center.px-4
      | {{ infoText }}
    form.col-span-12.mt-4
      .col-12.flex.items-center
        .login-text Email:
      .col-12.col-lg
        BaseInput(v-model="username")
      .mt-2(v-if="state === 2 || state === 1")
        .col-span-12.flex.items-center
          .login-text Password:
        .col-span-12
          BaseInput(v-model="password" type="password")
      .mt-2(v-if="state === 2")
        .col-span-12.flex.items-center
          .login-text Password:
        .col-span-12
          BaseInput(v-model="password2" type="password")
    .buttons.mt-4.flex.justify-end.w-full.col-span-12
      Btn.me-2(@clicked="pressedOk()" text="OK") 
      Btn(@clicked="changeShowHelp()" text="Help" :active="showHelp")
  .buttons.flex.flex-col.bg-shadow-inner.p-4.m-2.rounded(v-if="showHelp === true")
    p Some helping info and stuff
    div(class="flex justify-center mt-4")
      Btn.me-4(@clicked="changeState(2)" v-if="state === 1" text="Create User") 
      Btn.me-4(@clicked="changeState(1)" v-else text="Login")
      Btn(@clicked="changeState(3)" text="Forgot password") 
</template>

<script setup lang="ts">
import { authStore } from '@/stores/authStore'
import type { IProgram } from '@/models/index'
import { ref } from 'vue'
import router from '@/router'

const state = ref(1)
const username = ref<string>("")
const password = ref<string>("")
const password2 = ref<string>("")
const info = ref<string>('info')
const infoText = ref<string>('Type a email and password to log in')
const showHelp = ref<boolean>(false)
const authstore = authStore()
const program = ref({
  name: 'LogInNow', 
  isActive: true, 
  image: 'fa-user-lock',
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
  authstore.loginUser(username.value, password.value).then(() => {
    setTimeout(() => {
      router.push('/')
    }, 100) 
  })
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
    info.value = 'blue'
    program.value.name = 'Log in now'
    infoText.value = 'Type a email and password to log into Windows'
  } else if (stateVal === 2) {
    state.value = 2
    info.value = 'yellow'
    program.value.name = 'Register user'
    infoText.value = 'Type a email and password to create a user'
  } else if (stateVal === 3) {
    state.value = 3
    info.value = 'green'
    program.value.name = 'Reset password'
    infoText.value = 'Type a email to send an reset email notification'
  }
}
</script>