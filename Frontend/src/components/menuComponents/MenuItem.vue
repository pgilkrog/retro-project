<template lang="pug">
.menu-item(class="py-2 px-4 w-full justify-between flex items-center text-black hover:bg-blue-500" @click="openProgram()")
  h3(class="flex items-center me-6")
    IconComponent.me-3(:color="color === 'light' ? 'dark' : color" :name="img") 
    |  {{title}}
  span(v-if="hasChildren === true") 
    IconComponent.ms-2(name="fa-caret-right")
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/authStore'
import { useRouter } from 'vue-router'

const { img, title = 'Title not given', hasChildren = false, componentName = 'Name not given', color } = defineProps<{
  img: string,
  title: string,
  hasChildren: boolean,
  componentName: string,
  color: string
}>()

const authstore = useAuthStore()
const router = useRouter()

const openProgram = () => {
  switch(title) {
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
    case 'LaCosaNostra':
      router.push('/lacosanostra')
      break
    default:
      break
  }
}

const signOut = async () => {
  await authstore.signOut()
  authstore.$reset()
  router.push('/login')
}

</script>