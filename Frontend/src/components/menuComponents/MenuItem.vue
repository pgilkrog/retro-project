<template lang="pug">
.menu-item.py-2.px-4.w-100.d-flex.align-items-center.text-black(@click="openProgram()")
  h3.text-bold.me-4
    i(:class="img")
  |  {{title}}
  span(v-if="hasChildren == true") >
</template>

<script lang="ts">
import { authStore } from '@/stores/authStore';
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  props: {
    img: String,
    title: String,
    hasChildren: Boolean,
    componentName: String
  },
  setup (props) {
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
        default:
          console.log('')
          break
      }
    }

    const signOut = () => {
      authstore.signOut()
    }

    return {
      authstore,
      openProgram
    }
  }
})
</script>