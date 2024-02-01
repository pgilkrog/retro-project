<template lang="pug">
.menu-wrapper(class="bg-gray-300 bottom-0 fixed bg-shadow flex flex-col rounded left-5")
  .menu-item(v-for="(item, index) in menuList" :key="index")
    MenuItem(:title="item.title" :img="item.img" :hasChildren="item.subMenu.length > 0")
    .submenu.hidden.bg-secondary.bg-shadow(v-if="item.subMenu.length > 0")
      .flex-column
        .menu-item(v-for="(subitem, subindex) in item.subMenu" :key="subindex")
          MenuItem(:title="subitem.title" :img="subitem.img") 
          .submenu.bg-secondary.bg-shadow(v-if="subitem.subMenu.length > 0")
            .flex-column
              .menu-item(v-for="(subitem2, subindex) in subitem.subMenu" :key="subindex")
                MenuItem(:title="subitem2.title" :img="subitem2.img") 
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { IMenuItem }  from '@/models/index'
import MenuItem from './MenuItem.vue'
import jsondata from '@/assets/menuData.json'

const { showMenu = false } = defineProps({
  showMenu: Boolean
})

const menuList = ref([] as IMenuItem[])
const createMenu = () => {
  menuList.value = JSON.parse(JSON.stringify(jsondata)) 
}

onMounted(() => {
  createMenu()
})

</script>

<style lang="sass" scoped>
.menu-item
    &:hover
    &:hover + .submenu, .submenu:hover
      display: block
    .submenu
      display: none
      left: 203px
      color: black
      margin-top: -65px
      img 
        height: 35px
</style>