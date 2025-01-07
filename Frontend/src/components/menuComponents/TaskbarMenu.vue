<template>
  <div v-if="menuList.length > 0">
    <MenuList
      :menu-list="menuList"
      class="left-5 bottom-20 -mb-2 fixed"
    />
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
