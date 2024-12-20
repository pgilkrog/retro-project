<template>
  <div>
    <ButtonComponent
      @clicked="changeShowMenu()"
      text="open"
    />
    <div class="flex flex-col gap-y-2 mt-2">
      <MenuPopupItem
        v-for="(item, key) in dis"
        :key
        v-bind="item"
        v-show="showMenu"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { useAppStore } from '@/stores/appStore'

interface IListItem {
  name: string
  icon: string
  method: () => 0
}

const { title, list } = defineProps<{
  title: string
  list: IListItem[]
}>()

const appStore = useAppStore()
const showMenu = ref(false)
const dis = [
  {
    name: 'hej',
    method: () => {
      thismehtod2()
    },
    icon: 'fa-house',
  },
  {
    name: 'dav',
    method: () => {
      thismehtod()
    },
    icon: 'fa-house',
  },
  {
    name: 'check',
    method: (item: object) => {
      testthistho(item)
    },
    icon: 'fa-house',
  },
]

const changeShowMenu = () => {
  showMenu.value = !showMenu.value
}

const thismehtod = () => {
  console.log('run this')
}

const thismehtod2 = () => {
  console.log('run this 2')
}

const testthistho = (item: object) => {
  appStore.thismaybe(item)
}
</script>
