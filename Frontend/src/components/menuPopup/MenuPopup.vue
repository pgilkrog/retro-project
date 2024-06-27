<template lang="pug">
div
  ButtonComponent(v-on:clicked="changeShowMenu()" text="open")  
  div(class="flex flex-col gap-y-2 mt-2")
    MenuPopupItem(v-for="item in list" v-bind="item" v-show="showMenu")
</template>
<script setup lang="ts">
import {ref} from 'vue'

interface iListItem {
  name: string
  icon: string
  method: () => {}
}
const { title, list } = defineProps<{
  title: string,
  list: iListItem[]
}>()

const showMenu = ref(false)

const changeShowMenu = () => {
  showMenu.value = !showMenu.value
}
</script>