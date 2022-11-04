<template lang="pug">
.home-wrapper.bg-fill
  .desktop-container
    DesktopItem(
      v-for="(item, index) in allPrograms"
      :key="index"
      :img="item.Image"
      :title="item.DisplayName"
      v-on:generateComponent="generateComponent(item)"
    )
    //- .row.gx-0
    //-   DesktopItem(
    //-     img="https://win98icons.alexmeub.com/icons/png/computer_explorer_cool-0.png" 
    //-     title="My Computer" 
    //-     v-on:generateComponent="generateComponent('MyComputer', 'https://win98icons.alexmeub.com/icons/png/computer_explorer_cool-0.png')"
    //-   )
    //-   DesktopItem(img="https://win98icons.alexmeub.com/icons/png/internet_connection_wiz-2.png" title="The Internet")
    //- .row.gx-0
    //-   DesktopItem(
    //-     img="https://win98icons.alexmeub.com/icons/png/network_normal_two_pcs-5.png" 
    //-     title="Network Neighborhood"
    //-     v-on:generateComponent="generateComponent('NetworkNeighborhood', 'https://win98icons.alexmeub.com/icons/png/network_normal_two_pcs-5.png')"
    //-   )
    //-   DesktopItem(
    //-     img="https://win98icons.alexmeub.com/icons/png/ms_dos-1.png"
    //-     title="PawVania"
    //-     v-on:generateComponent="generateComponent('PawVania', 'https://win98icons.alexmeub.com/icons/png/ms_dos-1.png')"
    //-   )
    //- .row.gx-0
    //-   DesktopItem(img="https://win98icons.alexmeub.com/icons/png/mailbox_world-2.png" title="Inbox")
    //-   DesktopItem(
    //-       img="https://win98icons.alexmeub.com/icons/png/ms_dos-1.png" 
    //-       title="FlappyDisk"
    //-       v-on:generateComponent="generateComponent('FlappyDisk', 'https://win98icons.alexmeub.com/icons/png/ms_dos-1.png')"
    //-     )
    //- .row.gx-0
    //-   DesktopItem(img="https://win98icons.alexmeub.com/icons/png/recycle_bin_full-2.png" title="Recycle Bin")
    //- .row.gx-0
    //-   DesktopItem(
    //-     img="https://win98icons.alexmeub.com/icons/png/paint_file-4.png" 
    //-     title="Paint"
    //-     v-on:generateComponent="generateComponent('Paint', 'https://win98icons.alexmeub.com/icons/png/paint_file-4.png')"
    //-   )
  Component(
    v-for="(component, index) in activePrograms"
    :key="index"
    :id="component.Name"
    :is="component.Name"
    v-on:closeWindow="closeWindow(component.Name)"
    :program="component"
  )
  //- Game
</template>

<script lang="ts">
import type { IProgram } from '@/models/IProgram'
import { defineComponent, computed } from 'vue'

import DesktopItem from '@/components/DesktopItem.vue'
import MyComputer from '@/components/programs/MyComputer.vue'
import NetworkNeighborhood from '@/components/programs/NetworkNeightborhood.vue'
import MSDOS from '@/components/programs/MSDOS.vue'
import FlappyDisk from '@/phaser/flappy-disk/components/Game.vue'
import PawVania from '@/phaser/first-game/components/Game.vue'
import Paint from '@/components/programs/Paint.vue'

import { programsStore } from '@/stores/programsStore'

export default defineComponent({
  components: {
    DesktopItem,
    MyComputer,
    NetworkNeighborhood,
    MSDOS,
    Paint,
    FlappyDisk,
    PawVania
  },
  props: {

  },
  data() {
    return {
      programsstore: programsStore(),
      activePrograms: {},
      allPrograms: [] as IProgram[]
    }
  },
  methods: {
    generateComponent(program: IProgram) {
      this.programsstore.addProgramToActive(program)
    },
  },
  mounted() {
    this.activePrograms = computed(() => this.programsstore.getActivePrograms as IProgram[])
    this.allPrograms = this.programsstore.getPrograms
  }
})
</script>