<template lang="pug">
div
  template(v-if="userIsLoggedIn === true")
    HomeView(:componentList="componentList" v-on:generateComponent="generateComponent" v-on:closeWindow="closeWindow")
    Menu(v-bind:showMenu="showMenu")
    Taskbar(v-on:changeShowMenu="changeShowMenu()" :componentList="componentList" )
  template(v-else)
    LoginScreen
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { UserModule } from '../src/store/UserModule'
import { ProgramsModule } from './store/ProgramsModule'
import { IProgram } from './models/IProgram'

import LoginScreen from './components/LoginScreen.vue'
import Taskbar from '@/components/Taskbar.vue'
import Menu from '@/components/menuComponents/Menu.vue'
import HomeView from './views/HomeView.vue'

@Component({
  components: {
    Taskbar,
    LoginScreen,
    Menu,
    HomeView
  }
})

export default class App extends Vue {
  showMenu = false
  componentList = ProgramsModule.programs as IProgram[]

  mounted() {
    UserModule.init()
  }

  changeShowMenu () {
    console.log("Pressed-69825-70949", this.showMenu)
    this.showMenu = !this.showMenu
  }

  get userIsLoggedIn () {
    return UserModule.LoggedIn
  }

  generateComponent(compName: IProgram) {
    if (this.componentList.find(x => x.name === compName.name) === undefined) {
      this.componentList.push(compName);
      ProgramsModule.SetPrograms(this.componentList)      
    }
  }

  closeWindow(programName: string) {
    var newList = this.componentList.filter(x => x.name !== programName)
    ProgramsModule.SetPrograms(newList)
    this.componentList = ProgramsModule.programs as IProgram[]
  }
} 
</script>