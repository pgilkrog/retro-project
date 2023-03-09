<template lang="pug">
div
  template(v-if="userIsLoggedIn === false")
    LoginScreen
  template(v-else-if="userIsLoggedIn === true && userBackground() !== undefined && checkedAuth === true")
    .app-wrapper(:style="[userBackground() !== 'undefined' ? {'background-image': 'url('+ userBackground() + ')'} : {'background': userBackgroundColor()}]")
      router-view()
      Menu(v-bind:showMenu="showMenu")
      Taskbar(v-on:changeShowMenu="changeShowMenu" :showMenu="showMenu")
  template(v-else)
    h1 hejsa
</template>

<script lang="ts">
import LoginScreen from './components/auth/LoginScreen.vue'
import Taskbar from '@/components/taskbar/Taskbar.vue'
import Menu from '@/components/menuComponents/Menu.vue'
import HomeView from '@/views/HomeView.vue'
import ErrorComponent from '@/components/ErrorComponent.vue'

import { userStore } from './stores/userStore'
import { programsStore } from './stores/programsStore'
import { errorStore } from './stores/errorStore'
import { defineComponent, ref, computed, onMounted } from 'vue'

export default defineComponent({
  components: {
    HomeView,
    Menu,
    Taskbar,
    LoginScreen,
    ErrorComponent
  },
  setup() {
    const showMenu = ref(false)
    const userstore = userStore()
    const programsstore = programsStore()
    const errorstore = errorStore()

    const userIsLoggedIn = computed(() => userstore.getIsLoggedIn)
    const checkedAuth = computed(() => userstore.getCheckedAuth)
    const userBackground = (() => userstore.getUserData.UseBackgroundImage)
    const userBackgroundColor = (() => userstore.getUserData.BackgroundColor)

    onMounted(() => {
      userstore.init()
      programsstore.init()
    })

    const changeShowMenu = () => {
      showMenu.value = !showMenu.value
    }

    return {
      showMenu,
      userIsLoggedIn,
      checkedAuth,
      errorstore,
      userBackground,
      changeShowMenu,
      userBackgroundColor
    }
  }
})
</script>
