<template lang="pug">
.menu-item.py-2.px-4.w-100.d-flex.align-items-center.text-dark(@click="openProgram()")
  h3.text-bold.me-4
    IconComponent.me-3(:variant="props.color === 'light' ? 'dark' : props.color" :name="props.img") 
  |  {{title}}
  span(v-if="props.hasChildren == true") 
    IconComponent.ms-2(name="fa-caret-right")
</template>

<script setup lang="ts">
import { authStore } from '@/stores/authStore';
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  img: String,
  title: String,
  hasChildren: Boolean,
  componentName: String
})

const authstore = authStore()
const router = useRouter()

const openProgram = () => {
  switch(props.title) {
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
    case 'Platformer':
      router.push('/platformer')
      break
    case 'Salvatore':
      router.push('/salvatore')
      break
    default:
      break
  }
}

const signOut = () => {
  authstore.signOut()
}

</script>