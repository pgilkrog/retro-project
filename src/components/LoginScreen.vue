<template lang="pug">
.login-screen-wrapper.center-item.text-black
  WindowFrame(:program="{Name: 'Log in now', Id: 0, IsActive: true, Image: ''}" :showMenu="false" variant="info")
    .d-flex.p-4
      .image.pe-4
        i.bi.bi-key-fill.text-warning
      .d-flex.flex-column
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
        button.btn.bg-shadow(v-on:click="confirmLogin()") OK 
        button.btn.bg-shadow.mt-2 Cancel
</template>

<script lang="ts">
import WindowFrame from './WindowFrame.vue'
import { userStore } from '../stores/userStore'

export default {
  components: {
    WindowFrame
  },
  data() {
    return {
      username: "",
      password: "",
      userstore: userStore()
    }
  },
  methods: {
    confirmLogin(): void {
      this.userstore.loginUser(this.username, this.password)
      .then(() =>
        console.log('GOOD')
      )
      .catch(() => console.log('Error'))
    },
    registerUser(): void {
      this.userstore.registerUser(this.username, this.password)
    }
  }
}
</script>