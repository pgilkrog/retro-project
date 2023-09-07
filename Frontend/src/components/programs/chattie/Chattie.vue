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
    span(v-for="(user, index) in userstore.allUsers" :key="index") 
      .item.p-2.m-1(v-if="user.email !== userstore.userData?.email" @click="activateRoom(user.email)") 
        .d-flex.align-items-center
          IconComponent(name="fa-user" :variant="chatstore.onlineUsers.includes(user.email) ? 'success' : 'danger'" size="20") 
          .ms-4.text-success(v-if="chatstore.onlineUsers.includes(user.email)") {{ user.email }}
          .ms-4.text-danger(v-else) {{ user.email }}
  ChatWindow(
    v-for="(chat, index) in chatstore.activeRooms" 
    :key="index" 
    :activeChat="chat"
  )
</template>
<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import type { IProgram } from '../../../models/index'
import { userStore } from '@/stores/userStore'
import ChatWindow from './ChatWindow.vue'
import { chatStore } from '@/stores/chatStore'
import type { PropType } from 'vue'

const { program } = defineProps({
  program: Object as PropType<IProgram>
})

const chatstore = chatStore()
const userstore = userStore()

onMounted(async () => {
  await chatstore.init()
  await userstore.getAllUsers()
  await console.log('', userstore.allUsers)
})

onUnmounted(() => {
  chatstore.chatDisconnect()
})

const activateRoom = (user: string) => {
  chatstore.joinRoom([user, userstore.userData!.email])
}

</script>
<style lang="sass">
</style>