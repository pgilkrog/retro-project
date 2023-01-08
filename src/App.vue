<template lang="pug">
div
  template(v-if="isLoading === true")
    .d.flex.align-items-center.text-white
      strong Loading...
      .spinner-border.ms-auto
  template(v-else-if="this.userIsLoggedIn === true && isLoading === false")
    HomeView(v-on:closeWindow="closeWindow")
    Menu(v-bind:showMenu="showMenu")
    Taskbar(v-on:changeShowMenu="changeShowMenu()" :showMenu="showMenu" )
  template(v-else)
    LoginScreen
</template>

<script lang="ts">
import { RouterView } from 'vue-router'
import LoginScreen from './components/LoginScreen.vue'
import Taskbar from '@/components/taskbar/Taskbar.vue'
import Menu from '@/components/menuComponents/Menu.vue'
import HomeView from './views/HomeView.vue'
import { userStore } from './stores/userStore'
import { programsStore } from './stores/programsStore'
import type { IProgram } from './models/IProgram'
import { defineComponent } from 'vue'
import { computed } from 'vue'

export default defineComponent({
  components: {
    HomeView,
    Menu,
    Taskbar,
    LoginScreen
  },
  data() {
    return {
      showMenu: false,
      componentList: [] as IProgram[],
      userstore: userStore(),
      programsstore: programsStore(),
      userIsLoggedIn: {},
      isLoading: false
    }
  },
  mounted() {
    this.userstore.init()
    this.userIsLoggedIn = computed(() => this.userstore.getIsLoggedIn)
    this.isLoading = false
  },
  methods: {
    changeShowMenu () {
      console.log("Pressed", this.showMenu)
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
