<template lang="pug">
.menu-wrapper(class="bg-gray-300 bottom-20 -mb-2 fixed bg-shadow flex flex-col rounded left-5")
  .menu-item(v-for="(item, index) in menuList" :key="index")
    MenuItem(:title="item.title" :img="item.img" :hasChildren="item.subMenu.length > 0")
    .submenu.hidden.bg-shadow(v-if="item.subMenu.length > 0")
      .flex-column
        .menu-item(v-for="(subitem, subindex) in item.subMenu" :key="subindex")
          MenuItem(:title="subitem.title" :img="subitem.img")
          .submenu.bg-shadow(v-if="subitem.subMenu.length > 0")
            .flex-column
              .menu-item(v-for="(subitem2, subindex) in subitem.subMenu" :key="subindex")
                MenuItem(:title="subitem2.title" :img="subitem2.img")
</template>

<script setup lang="ts">
import type { IMenuItem }  from '@/models/index'
import jsondata from '@/assets/menuData.json'

const { showMenu = false } = defineProps<{
  showMenu: boolean
}>()

const menuList = ref([] as IMenuItem[])
const createMenu = () => {
  menuList.value = JSON.parse(JSON.stringify(jsondata))
}

onMounted(() => {
  createMenu()
})

</script>
<style lang="sass">
.menu-item
  cursor: pointer
  &:hover,
  &:hover + .submenu, .submenu:hover
    display: flex
  .submenu
    position: absolute
    display: none
    margin-left: 100%
    margin-bottom: 100%
    img
      height: 35px
</style>