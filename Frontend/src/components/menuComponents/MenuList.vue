<template>
  <ul class="menu-list bg-gray-300 bg-shadow flex flex-col rounded">
    <li
      v-for="(item, key) in menuList"
      :key="key"
    >
      <MenuItem
        :title="item.title"
        :img="item.img"
        :list="item.subMenu"
      />
    </li>
  </ul>
</template>
<script setup lang="ts">
import type { IMenuItem } from '@/models'

defineProps<{
  menuList: IMenuItem[]
}>()
</script>
