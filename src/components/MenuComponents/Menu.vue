<template lang="pug">
.menu-wrapper.bg-secondary.fixed-bottom.fit-content.st-border.d-flex(v-if="showMenu")
  .side-bar.bg-dark
  .flex-column
    .menu-item(v-for="(item, index) in menuList" :key="index")
      MenuItem(:title="item.title" :img="item.img" :hasChildren="item.subMenu.length > 0")
      .submenu.bg-secondary.st-border(v-if="item.subMenu.length > 0")
        .flex-column
          .menu-item(v-for="(subitem, subindex) in item.subMenu" :key="subindex")
            MenuItem(:title="subitem.title" :img="subitem.img") 
            .submenu.bg-secondary.st-border(v-if="subitem.subMenu.length > 0")
              .flex-column
                .menu-item(v-for="(subitem2, subindex) in subitem.subMenu" :key="subindex")
                  MenuItem(:title="subitem2.title" :img="subitem2.img") 
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import  { IMenuItem }  from '@/models/IMenuItem'

import MenuItem from './MenuItem.vue'
import jsondata from '@/assets/menuData.json'

@Component({
  components: {
    MenuItem
  },
  props: {
    showMenu: Boolean
  }
})

export default class Menu extends Vue {
  showMenu: boolean | undefined

  menuList: IMenuItem[] = []

  mounted() {
    this.createMenu()
  }

  createMenu() {
    this.menuList = JSON.parse(JSON.stringify(jsondata))
  }
}
</script>