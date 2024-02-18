<template lang="pug">
.menu-item(class="py-2 px-4 w-full flex items-center text-black" @click="openProgram()")
  h3.text-bold.me-4
    IconComponent.me-3(:variant="color === 'light' ? 'dark' : color" :name="img") 
  |  {{title}}
  span(v-if="hasChildren === true") 
    IconComponent.ms-2(name="fa-caret-right")
</template>

<script setup lang="ts">
import { authStore } from '@/stores/authStore'
import { useRouter } from 'vue-router'

const { img, title = 'Title not given', hasChildren = false, componentName = 'Name not given', color } = defineProps({
  img: String,
  title: String,
  hasChildren: Boolean,
  componentName: String,
  color: String
})

const authstore = authStore()
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
    default:
      break
  }
}

const signOut = async () => {
  await authstore.signOut()
  router.push('/login')
}

</script>