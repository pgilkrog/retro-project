<template>
  <div
    class="cursor-pointer space-x-4 py-2 px-4 w-full justify-between flex items-center text-black hover:bg-blue-500"
    @click="openProgram()"
    @mouseleave="onMouseLeave()"
    @mouseover="onMouseOver()"
  >
    <h3 class="flex items-center space-x-2">
      <IconComponent
        :color="color === 'light' ? 'dark' : color"
        :name="img"
      />
      <p>{{ title }}</p>
    </h3>
    <span v-if="list.length > 0">
      <IconComponent name="fa-caret-right" />
    </span>
  </div>
  <MenuList
    v-show="list.length > 0 && showSubMenu === true"
    class="absolute ml-[100%] mb-[100%] -mt-12 !border-l-0"
    :menu-list="list"
    @mouseleave="onMouseLeave()"
    @mouseover="onMouseOver()"
  />
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/authStore'
import { useRouter } from 'vue-router'
import MenuList from './MenuList.vue'
import type { IMenuItem } from '@/models'

const {
  img = 'bi-folder',
  title,
  color = 'black',
  list = [],
} = defineProps<{
  img?: string
  title: string
  color?: string
  list?: IMenuItem[]
}>()

const authstore = useAuthStore()
const router = useRouter()
const showSubMenu = ref<boolean>(false)

const onMouseOver = () => {
  showSubMenu.value = true
}

const onMouseLeave = () => {
  showSubMenu.value = false
}

const openProgram = () => {
  switch (title) {
    case 'Shutdown...':
      router.push('/shutdown')
      break
    case 'Logout':
      signOut()
      break
    case 'Ping Pong':
      router.push('/pingpong')
      break
    case 'Space Invaders':
      router.push('/spaceinvaders')
      break
    case 'Flappy Disk':
      router.push('/flappydisk')
      break
    case 'Salvatore':
      router.push('/salvatore')
      break
    case 'TestStuff':
      router.push('/teststuff')
      break
    default:
      break
  }
}

const signOut = () => {
  authstore.signOut()
  authstore.$reset()
  router.push('/login')
}
</script>
