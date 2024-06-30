<template lang="pug">
div
  ButtonComponent(v-on:clicked="changeShowMenu()" text="open")  
  div(class="flex flex-col gap-y-2 mt-2")
    MenuPopupItem(v-for="item in dis" v-bind="item" v-show="showMenu")
</template>
<script setup lang="ts">
import {ref} from 'vue'
import { useAppStore } from '@/stores/appStore'

interface iListItem {
  name: string
  icon: string
  method: () => {}
}
const { title, list } = defineProps<{
  title: string,
  list: iListItem[]
}>()

const appStore = useAppStore()
const showMenu = ref(false)
const dis = [
  {
    name: 'hej', method: () => thismehtod2(), icon: 'fa-house'
  },
  {
    name: 'dav', method: () => thismehtod(), icon: 'fa-house'
  },
  {
    name: 'check', method: (item: any) => testthistho(item), icon: 'fa-house'
  }
]
const changeShowMenu = () => {
  showMenu.value = !showMenu.value
}
const thismehtod = () => {
  console.log("run this")
}
const thismehtod2 = () => {
  console.log("run this 2")
}
const testthistho = (item: any) => {
  appStore.thismaybe(item)
}
</script>