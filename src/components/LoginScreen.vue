<template lang="pug">
.login-screen-wrapper.center-item.text-light
  WindowFrame(:program="{Name: 'Log in now'}" :showMenu="false" variant="info").rounded
    .d-flex.p-4
      .image.pe-4
        h1.bi.bi-key-fill.text-warning
      .d-flex.flex-column
        | Type a user name and password to log into Windows
        .d-flex.mt-4
          .login-text User name:
          input.bg-shadow-inner(type="text" autocomplete="off" name="username" v-model="username")
        .d-flex.mt-2
          .login-text Password:
          input.bg-shadow-inner(type="password" name="password" autocomplete="off" v-model="password")
      .buttons.d-flex.flex-column.ps-4
        button.btn(v-on:click="confirmLogin()") OK 
        button.btn.mt-2 Cancel
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
    confirmLogin() {
      this.userstore.loginUser(this.username, this.password)
    }
  }
}
</script>