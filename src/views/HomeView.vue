<template lang="pug">
div.bg-fill
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
  .row.gx-0
    DesktopItem(img="https://win98icons.alexmeub.com/icons/png/mailbox_world-2.png" title="Inbox")
  .row.gx-0
    DesktopItem(img="https://win98icons.alexmeub.com/icons/png/recycle_bin_full-2.png" title="Recycle Bin")

  Component(
    v-for="(component, index) in componentList" 
    :key="index" :is="component.name" 
    v-on:closeWindow="closeWindow"
  )
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Program } from '@/models/Program';

import DesktopItem from '@/components/DesktopItem.vue';
import MyComputer from '@/components/Programs/MyComputer.vue';
import NetworkNeighborhood from '@/components/Programs/NetworkNeighborhood.vue';

@Component({
  components: {
    DesktopItem,
    MyComputer,
    NetworkNeighborhood
  },
  props: {
    componentList: Array
  }
})

export default class HomeView extends Vue {
  componentList: Program[] | undefined

  generateComponent(compName: string, compImg: string) {
    this.$emit('generateComponent', { name: compName, img: compImg, isActive: true })
  }

  closeWindow(programName: string) {
    this.$emit('closeWindow', programName)
  }
}
</script>
