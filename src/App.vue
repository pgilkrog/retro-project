<template lang="pug">
span
  template(v-if="hasAuthUser === false")
    .spinner-border
      span.visually-hidden Loading...
  template(v-else-if="error.show === true")
    ErrorComponent(:text="error.text" :variant="danger")
  template(v-else-if="this.userIsLoggedIn === true && hasAuthUser === true")
    //- HomeView(v-on:closeWindow="closeWindow")
    router-view(v-on:closeWindow="closeWindow")
    Menu(v-bind:showMenu="showMenu")
    Taskbar(v-on:changeShowMenu="changeShowMenu()" :showMenu="showMenu")
  template(v-else)
    LoginScreen
</template>

<script lang="ts">
import { RouterView } from 'vue-router'
import LoginScreen from './components/LoginScreen.vue'
import Taskbar from '@/components/taskbar/Taskbar.vue'
import Menu from '@/components/menuComponents/Menu.vue'
import HomeView from '@/views/HomeView.vue'
import ErrorComponent from '@/components/ErrorComponent.vue'

import type { IProgram } from './models/IProgram'
import { userStore } from './stores/userStore'
import { programsStore } from './stores/programsStore'
import { errorStore } from './stores/errorStore'
import { defineComponent } from 'vue'
import { computed } from 'vue'

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
      userIsLoggedIn: {},
      hasAuthUser: {},
      error: {} 
    }
  },
  mounted() {
    this.userstore.init()
    this.programsstore.init()

    this.userIsLoggedIn = computed(() => this.userstore.getIsLoggedIn)
    this.error = computed(() => this.errorstore.getError)
    this.hasAuthUser = computed(() => this.userstore.getHasAuthUser)
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
