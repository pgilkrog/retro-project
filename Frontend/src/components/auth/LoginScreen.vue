<template>
  <WindowFrame
    :program="program"
    :show-menu="false"
    variant="blue"
    :is-moveable="false"
    :disable-buttons="true"
    :is-static="true"
  >
    <div class="login-screen grid py-2 px-4">
      <div class="col-span-4 text-center">
        <icon-component
          name="fa-key"
          color="yellow"
          size="30"
          rotate="0"
        />
      </div>
      <div class="col-span-8 flex items-center px-4">
        {{ infoText }}
      </div>
      <form class="col-span-12 mt-4">
        <div class="col-12 col-lg">
          <input-component
            v-model="username"
            label="Username"
            :use-two-lines="true"
            :use-debounce="true"
          />
        </div>
        <div
          class="mt-2"
          v-if="state === 2 || state === 1"
        >
          <div class="col-span-12">
            <input-component
              v-model="password"
              type="password"
              label="Password"
              :use-two-lines="true"
            />
          </div>
        </div>
        <div
          class="mt-2"
          v-if="state === 2"
        >
          <div class="col-span-12 flex items-center">
            <div class="login-text">Password:</div>
          </div>
          <div class="col-span-12">
            <input-component
              v-model="password2"
              type="password"
            />
          </div>
        </div>
      </form>
      <div class="buttons mt-4 flex justify-end w-full col-span-12">
        <ButtonComponent
          @clicked="devLogin()"
          text="Guest login"
        />
        <ButtonComponent
          @clicked="pressedOk()"
          text="OK"
        />
        <!-- Uncomment below if needed -->
        <!-- <button-component @clicked="changeShowHelp()" text="Help" :active="showHelp"></button-component> -->
      </div>
    </div>
    <div
      class="buttons flex flex-col bg-shadow-inner p-4 m-2"
      v-if="showHelp === true"
    >
      <p>Some helping info and stuff</p>
      <div class="flex justify-center mt-4">
        <ButtonComponent
          class="me-4"
          @clicked="changeState(2)"
          v-if="state === 1"
          text="Create User"
        />
        <ButtonComponent
          class="me-4"
          @clicked="changeState(1)"
          v-else
          text="Login"
        />
        <ButtonComponent
          @clicked="changeState(3)"
          text="Forgot password"
        />
      </div>
    </div>
  </WindowFrame>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/authStore'
import type { IProgram } from '@/models/index'
import router from '@/router'

const authstore = useAuthStore()

const state = ref<number>(1)
const username = ref<string>('')
const password = ref<string>('')
const password2 = ref<string>('')
const info = ref<string>('info')
const infoText = ref<string>('Type a email and password to log in')
const showHelp = ref<boolean>(false)
const program = ref<IProgram>({
  _id: 'LoginScreenProgram',
  name: 'LogInNow',
  isActive: true,
  image: 'fa-user-lock',
  color: 'light',
  displayName: 'Log in now',
  sortOrder: 1,
  type: 'Program',
  top: 200,
  left: 200,
})

const pressedOk = (): void => {
  if (state.value === 1) confirmLogin()
  else if (state.value === 2) registerUser()
  else changePassword()
}

const confirmLogin = (): void => {
  authstore.loginUser(username.value, password.value).then(() => {
    setTimeout(() => {
      router.push('/')
    }, 100)
  })
}

const registerUser = (): void => {
  if (password.value === password2.value) authstore.registerUser(username.value, password.value)
}

const changePassword = (): void => {
  // authstore.changePassword(password.value)
}

// const changeShowHelp = (): void => {
//   showHelp.value = !showHelp.value
// }

const devLogin = (): void => {
  authstore.loginUser('check@check.com', 'hejsa1234').then(() => {
    setTimeout(() => {
      router.push('/')
    }, 100)
  })
}

const changeState = (stateVal: number): void => {
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
