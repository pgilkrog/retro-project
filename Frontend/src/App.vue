<template lang="pug">
template(v-if="userIsLoggedIn === false && checkedAuth === true")
  LoginScreen
template(v-else-if="userIsLoggedIn === true && userBackground !== undefined && checkedAuth === true")
  .app-wrapper(:style="[userBackground !== 'undefined' ? {'background-image': 'url('+ userBackground + ')'} : {'background': userBackgroundColor}]")
    router-view()
    Menu(v-bind:showMenu="showMenu")
    Taskbar(v-on:changeShowMenu="changeShowMenu" :showMenu="showMenu")
    ErrorComponent
</template>

<script lang="ts">
import LoginScreen from './components/auth/LoginScreen.vue'
import Taskbar from '@/components/taskbar/Taskbar.vue'
import Menu from '@/components/menuComponents/Menu.vue'
import HomeView from '@/views/HomeView.vue'
import ErrorComponent from '@/components/ErrorComponent.vue'

import { userStore } from './stores/userStore'
import { authStore } from '@/stores/authStore'
import { programsStore } from './stores/programsStore'
import { defineComponent, ref, computed, onMounted, watch } from 'vue'

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
    const authstore = authStore()
    const userstore = userStore()
    const programsstore = programsStore()

    const userIsLoggedIn = computed(() => authstore.getIsLoggedIn)
    const checkedAuth = computed(() => authstore.getCheckedAuth)
    const userBackground = computed(() => userstore.getBackgroundInUse)
    const userBackgroundColor = computed(() => '')

    onMounted(() => {
      authstore.init()
    })

    const changeShowMenu = () => {
      showMenu.value = !showMenu.value
    }

    // Watch for changes in userIsLoggedIn
    watch(userIsLoggedIn, (newValue, oldValue) => {
      if (newValue === true && oldValue === false) {
        // Call the methods you want to run when userIsLoggedIn changes to true
        programsstore.init()
        userstore.init()
      }
    })

    return {
      showMenu,
      userIsLoggedIn,
      checkedAuth,
      userBackground,
      changeShowMenu,
      userBackgroundColor
    }
  }
})
</script>
