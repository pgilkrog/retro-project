<template lang="pug">
.menu-item.py-2.px-4.w-100.d-flex.align-items-center.text-black(@click="openProgram()")
  h3.text-bold.me-4
    i(:class="img")
  |  {{title}}
  span(v-if="hasChildren == true") >
</template>

<script lang="ts">
import { userStore } from '@/stores/userStore';
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    img: String,
    title: String,
    hasChildren: Boolean,
    componentName: String
  },
  data() {
    return {
      userstore: userStore()
    }
  },
  methods: {
    openProgram() {
      switch(this.title) {
        case 'Shutdown...':
          this.$router.push('/shutdown')
          break
        case 'Logout':
          this.signOut()
          break
        case 'Ping Pong':
          this.$router.push('/pingpong')
          break
        case 'Space Invaders':
          this.$router.push('/spaceinvaders')
          break
        case 'Flappy Disk':
          this.$router.push('/flappydisk')
          break        
        case 'Platformer':
          this.$router.push('/platformer')
          break
        default:
          console.log('')
          break
      }
    },
    signOut() {
      this.userstore.signOut()
    }
  }
})
</script>