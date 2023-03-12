<template lang="pug">
.menu-wrapper.bg-secondary.fixed-bottom.fit-content.bg-shadow.d-flex.rounded(v-if="showMenu").flex-column
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
import type { IMenuItem }  from '@/models/index'

import MenuItem from './MenuItem.vue'
import jsondata from '@/assets/menuData.json'
import { defineComponent, ref, onMounted } from 'vue'

export default defineComponent({
  props: {
    showMenu: Boolean
  },
  components: {
    MenuItem
  },
  setup (props) {
    const menuList = ref([] as IMenuItem[])
    const createMenu = () => {
      menuList.value = JSON.parse(JSON.stringify(jsondata)) 
    }

    onMounted(() => {
      createMenu()
    })

    return {
      menuList,
      createMenu
    }
  }
})
</script>