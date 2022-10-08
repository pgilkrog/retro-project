<template lang="pug">
.home-wrapper.bg-fill
  .row.gx-0
    DesktopItem(
      img="https://win98icons.alexmeub.com/icons/png/computer_explorer_cool-0.png" 
      title="My Computer" 
      v-on:generateComponent="generateComponent('MyComputer', 'https://win98icons.alexmeub.com/icons/png/computer_explorer_cool-0.png')"
    )
    DesktopItem(img="https://win98icons.alexmeub.com/icons/png/internet_connection_wiz-2.png" title="The Internet")
  .row.gx-0
    DesktopItem(
      img="https://win98icons.alexmeub.com/icons/png/network_normal_two_pcs-5.png" 
      title="Network Neighborhood"
      v-on:generateComponent="generateComponent('NetworkNeighborhood', 'https://win98icons.alexmeub.com/icons/png/network_normal_two_pcs-5.png')"
    )
    DesktopItem(
      img="https://win98icons.alexmeub.com/icons/png/ms_dos-1.png"
      title="PawVania"
      v-on:generateComponent="generateComponent('Game', 'https://win98icons.alexmeub.com/icons/png/network_normal_two_pcs-5.png')"
    )
  .row.gx-0
    DesktopItem(img="https://win98icons.alexmeub.com/icons/png/mailbox_world-2.png" title="Inbox" 
  )
  .row.gx-0
    DesktopItem(img="https://win98icons.alexmeub.com/icons/png/recycle_bin_full-2.png" title="Recycle Bin")

  //- div.position-absolute(id="home-wrapper")
  //-   .my-header(
  //- v-on:click="dragElement(component.name)"
  //-   )
  Component(
    v-for="(component, index) in componentList" 
    :key="index" 
    :id="component.name" 
    :is="component.name" 
    v-on:closeWindow="closeWindow(component.name)" 
  )
  //- Game
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { IProgram } from '@/models/IProgram'

import DesktopItem from '@/components/DesktopItem.vue'
import MyComputer from '@/components/programs/MyComputer.vue'
import NetworkNeighborhood from '@/components/programs/NetworkNeighborhood.vue'
import Game from '@/phaser/first-game/components/Game.vue'

@Component({
  components: {
    DesktopItem,
    MyComputer,
    NetworkNeighborhood,
    Game
  },
  props: {
    componentList: Array
  }
})

export default class HomeView extends Vue {
  componentList: IProgram[] | undefined

  // pos1 = 0
  // pos2 = 0
  // pos3 = 0
  // pos4 = 0

  // dragElement(name: string) {
  //   if (document.getElementById(name)) {
  //     // if present, the header is where you move the DIV from:
  //     document.getElementById(name)!.onmousedown = this.dragMouseDown
  //   } else {
  //     // otherwise, move the DIV from anywhere inside the DIV:
  //     document.getElementById("home-wrapper")!.onmousedown = this.dragMouseDown
  //   }
  // }

  // dragMouseDown(e: any) {
  //   e = e || window.event
  //   e.preventDefault()
  //   // get the mouse cursor position at startup:
  //   this.pos3 = e.clientX
  //   this.pos4 = e.clientY
  //   document.onmouseup = this.closeDragElement
  //   // call a function whenever the cursor moves:
  //   document.onmousemove = this.elementDrag
  // }

  // elementDrag(e: any) {
  //   e = e || window.event
  //   e.preventDefault()
  //   // calculate the new cursor position:
  //   this.pos1 = this.pos3 - e.clientX
  //   this.pos2 = this.pos4 - e.clientY
  //   this.pos3 = e.clientX
  //   this.pos4 = e.clientY
  //   // set the element's new position:
  //   document.getElementById("home-wrapper")!.style.top = (document.getElementById("home-wrapper")!.offsetTop - this.pos2) + "px"
  //   document.getElementById("home-wrapper")!.style.left = (document.getElementById("home-wrapper")!.offsetLeft - this.pos1) + "px"
  // }

  // closeDragElement() {
  //   // stop moving when mouse button is released:
  //   document.onmouseup = null
  //   document.onmousemove = null
  // }

  generateComponent(compName: string, compImg: string) {
    this.$emit('generateComponent', { name: compName, img: compImg, isActive: true })
  }

  closeWindow(programName: string) {
    this.$emit('closeWindow', programName)
  }
}
</script>
