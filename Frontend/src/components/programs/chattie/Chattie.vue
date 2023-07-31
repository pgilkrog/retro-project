<template lang="pug">
WindowFrame(
  :program="program"
  :isMoveable="true"
  :variant="program.color"
  :showMenu="false"
)
  .top.d-flex.justify-content-between.bg-shadow.p-2.mb-1
    IconComponent(name="fa-user-plus" variant="success" size="40" rotate="0")
    IconComponent(name="fa-comment" variant="success" size="40" rotate="0")
    IconComponent(name="fa-phone" variant="success" size="40" rotate="0")
  .friends-list.d-flex.flex-column.bg-light.bg-shadow-inner
    span(v-for="(user, index) in chatstore.onlineUsers" :key="index") 
      .item.p-2.m-1(v-if="user !== userstore.userData?.email" @click="activateRoom(user)") 
        .d-flex.align-items-center
          IconComponent(name="fa-user" variant="success" size="20") 
          .ms-4 {{ user }}
  ChatWindow(
    v-for="(chat, index) in chatstore.activeRooms" 
    :key="index" 
    :activeChat="chat"
  )
</template>
<script setup lang="ts">
import { onMounted, toRefs } from 'vue'
import type { IProgram } from '../../../models/index'
import { userStore } from '@/stores/userStore'
import ChatWindow from './ChatWindow.vue'
import { chatStore } from '@/stores/chatStore'

const props = defineProps({
  program: Object as () => IProgram
})

const chatstore = chatStore()
const userstore = userStore()

onMounted(() => {
  chatstore.init()
})

const activateRoom = (user: string) => {
  chatstore.joinRoom([user, userstore.userData!.email])
}

</script>
<style lang="sass">
</style>