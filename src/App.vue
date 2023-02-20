<template lang="pug">
span
  template(v-if="error.show === true")
    ErrorComponent(:text="error.text" :variant="danger")
  template(v-else-if="this.userIsLoggedIn === true")
    router-view(v-on:closeWindow="closeWindow")
    Menu(v-bind:showMenu="showMenu")
    Taskbar(v-on:changeShowMenu="changeShowMenu()" :showMenu="showMenu")
  template(v-else)
    LoginScreen
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
import { defineComponent } from 'vue'
import type { IErrorItem, IProgram } from './models'

export default defineComponent({
  components: {
    HomeView,
    Menu,
    Taskbar,
    LoginScreen,
    ErrorComponent
  },
  data() {
    return {
      showMenu: false,
      componentList: [] as IProgram[],
      userstore: userStore(),
      programsstore: programsStore(),
      errorstore: errorStore(),
    }
  },
  computed: {
    userIsLoggedIn(): boolean {
      return this.userstore.getIsLoggedIn
    },
    error(): IErrorItem {
      return this.errorstore.getError
    }
  },
  mounted() {
    this.userstore.init()
    this.programsstore.init()
  },
  methods: {
    changeShowMenu () {
      this.showMenu = !this.showMenu
    },
    closeWindow(programName: string) {
      var newList = this.componentList.filter(x => x.Name !== programName)
      this.programsstore.setActivePrograms(newList)
      this.componentList = this.programsstore.getActivePrograms
    }
  }
})
</script>
