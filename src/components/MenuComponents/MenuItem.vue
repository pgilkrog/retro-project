<template lang="pug">
.menu-item.py-2.px-4.w-100.d-flex.align-items-center.text-black(@click="openProgram()")
  h3.text-bold.me-4
    i(:class="img")
  |  {{title}}
  span(v-if="hasChildren == true") >
</template>

<script lang="ts">
import { userStore } from '@/stores/userStore';

export default {
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
          this.signOut()
          break
      }
    },
    signOut() {
      this.userstore.signOut()
    }
  }
}
</script>