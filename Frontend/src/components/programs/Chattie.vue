<template lang="pug">
WindowFrame(
  :program="program"
  :isMoveable="true"
  :variant="program.color"
  :showMenu="false"
)
  .top(class="flex justify-between bg-shadow p-2 mb-1")
    IconComponent(name="fa-user-plus" color="success" size="40" rotate="0")
    IconComponent(name="fa-comment" color="success" size="40" rotate="0")
    IconComponent(name="fa-phone" color="success" size="40" rotate="0")
  .friends-list(class="flex flex-col bg-gray-300 bg-shadow-inner")
    span(v-for="user in userstore.allUsers" :key="user._id") 
      .item.p-2.m-1(v-if="user.email !== userstore.userData?.email" @click="activateRoom(user.email)") 
        .flex.items-center
          IconComponent(name="fa-user" :color="chatstore.onlineUsers.includes(user.email) ? 'green' : 'red'" size="20") 
          .ms-4.text-green-500(v-if="chatstore.onlineUsers.includes(user.email)") {{ user.email }}
          .ms-4.text-red-500(v-else) {{ user.email }}
  ChatWindow(
    v-for="(chat, index) in chatstore.activeRooms" 
    :key="index" 
    :activeChat="chat"
  )
</template>
<script setup lang="ts">
import type { IProgram } from '../../models/index'
import { userStore } from '@/stores/userStore'
import { chatStore } from '@/stores/chatStore'

const { program } = defineProps<{
  program: IProgram
}>()

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