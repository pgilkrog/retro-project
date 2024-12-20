<template>
  <div
    class="menu-wrapper bg-gray-300 bottom-20 -mb-2 fixed bg-shadow flex flex-col rounded left-5"
  >
    <div
      class="menu-item"
      v-for="(item, index) in menuList"
      :key="index"
    >
      <MenuItem
        :title="item.title"
        :img="item.img"
        :has-children="item.subMenu.length > 0"
      />
      <div
        class="submenu hidden bg-shadow"
        v-if="item.subMenu.length > 0"
      >
        <div class="flex-column">
          <div
            class="menu-item"
            v-for="(subitem, subindex) in item.subMenu"
            :key="subindex"
          >
            <MenuItem
              :title="subitem.title"
              :img="subitem.img"
            />
            <div
              class="submenu bg-shadow"
              v-if="subitem.subMenu.length > 0"
            >
              <div class="flex-column">
                <div
                  class="menu-item"
                  v-for="(subitem2, subindex2) in subitem.subMenu"
                  :key="subindex2"
                >
                  <MenuItem
                    :title="subitem2.title"
                    :img="subitem2.img"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IMenuItem } from '@/models/index'
import jsondata from '@/assets/menuData.json'

const menuList = ref<IMenuItem[]>([])

onMounted(() => {
  createMenu()
})

const createMenu = () => {
  menuList.value = JSON.parse(JSON.stringify(jsondata)) as IMenuItem[]
}
</script>
<style scoped lang="sass">
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
