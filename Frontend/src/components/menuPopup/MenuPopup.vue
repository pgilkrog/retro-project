<template>
  <div>
    <ButtonComponent
      @clicked="changeShowMenu()"
      :text="title"
    />
    <div class="flex flex-col gap-y-2 mt-2">
      <MenuPopupItem
        v-for="(item, key) in list"
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

const {
  title = 'open',
  list = [
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
  ],
} = defineProps<{
  title: string
  list: IListItem[]
}>()

const appStore = useAppStore()
const showMenu = ref(false)

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
