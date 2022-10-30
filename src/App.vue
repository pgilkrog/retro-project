<template lang="pug">
div
  template(v-if="this.userIsLoggedIn === true")
    HomeView(v-on:generateComponent="generateComponent" v-on:closeWindow="closeWindow")
    Menu(v-bind:showMenu="showMenu")
    Taskbar(v-on:changeShowMenu="changeShowMenu()" )
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
      userIsLoggedIn: {}
    }
  },
  mounted() {
    this.userIsLoggedIn = computed(() => this.userstore.getIsLoggedIn)
    console.log(this.programsstore.getPrograms)
  },
  methods: {
    changeShowMenu () {
      console.log("Pressed-69825-70949", this.showMenu)
      this.showMenu = !this.showMenu
    },
    generateComponent(compName: IProgram) {
      if (this.componentList.find(x => x.name === compName.name) === undefined) {
        this.componentList.push(compName);
        this.programsstore.setActivePrograms(this.componentList)      
      }
    },
    closeWindow(programName: string) {
      var newList = this.componentList.filter(x => x.name !== programName)
      this.programsstore.setActivePrograms(newList)
      this.componentList = this.programsstore.getActivePrograms
    }
  }
})
</script>
