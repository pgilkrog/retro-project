<template lang="pug">
div
  template(v-if="this.userIsLoggedIn === true")
    HomeView(:componentList="componentList" v-on:generateComponent="generateComponent" v-on:closeWindow="closeWindow")
    Menu(v-bind:showMenu="showMenu")
    Taskbar(v-on:changeShowMenu="changeShowMenu()" :componentList="componentList" )
  template(v-else)
    LoginScreen
</template>

<script lang="ts">
import { RouterView } from 'vue-router'
import LoginScreen from './components/LoginScreen.vue'
import Taskbar from '@/components/Taskbar.vue'
import Menu from '@/components/menuComponents/Menu.vue'
import HomeView from './views/HomeView.vue'
import { userStore } from './stores/userStore'
import { programsStore } from './stores/programsStore'
import type { IProgram } from './models/IProgram'
import { defineComponent } from 'vue'

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
      userIsLoggedIn: false
    }
  },
  methods: {
    changeShowMenu () {
      console.log("Pressed-69825-70949", this.showMenu)
      this.showMenu = !this.showMenu
    },
    generateComponent(compName: IProgram) {
      if (this.componentList.find(x => x.name === compName.name) === undefined) {
        this.componentList.push(compName);
        this.programsstore.setPrograms(this.componentList)      
      }
    },
    closeWindow(programName: string) {
      var newList = this.componentList.filter(x => x.name !== programName)
      this.programsstore.setPrograms(newList)
      this.componentList = this.programsstore.getPrograms()
    }
  }
})
</script>
