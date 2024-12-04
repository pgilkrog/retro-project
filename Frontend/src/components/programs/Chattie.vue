<template>
  <WindowFrame 
    :program="program" 
    :is-moveable="true" 
    :variant="program.color" 
    :show-menu="false"
  >
    <div class="top flex justify-between bg-shadow p-2 mb-1">
      <IconComponent 
        name="fa-user-plus" 
        color="success" 
        size="40" 
        rotate="0" 
      />
      <IconComponent 
        name="fa-comment" 
        color="success" 
        size="40" 
        rotate="0" 
      />
      <IconComponent 
        name="fa-phone" 
        color="success" 
        size="40" 
        rotate="0" 
      />
    </div>

    <div class="friends-list flex flex-col bg-gray-300 bg-shadow-inner">
      <span 
        v-for="user in userstore.allUsers" 
        :key="user._id"
      >
        <div 
          v-if="user.email !== userstore.userData?.email" 
          class="item p-2 m-1 flex items-center" 
          @click="activateRoom(user.email)"
        >
          <IconComponent 
            name="fa-user" 
            :color="chatstore.onlineUsers.includes(user.email) ? 'green' : 'red'" 
            size="20" 
          />
          <div 
            v-if="chatstore.onlineUsers.includes(user.email)"
            class="ms-4 text-green-500" 
          >
            {{ user.email }}
          </div>
          <div 
            class="ms-4 text-red-500" 
            v-else
          >
            {{ user.email }}
          </div>
        </div>
      </span>
    </div>

    <ChatWindow 
      v-for="(chat, index) in chatstore.activeRooms" 
      :key="index" 
      :active-chat="chat" 
    />
  </WindowFrame>
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
})

onUnmounted(() => {
  chatstore.chatDisconnect()
})

const activateRoom = (user: string) => {
  if (userstore.userData !== undefined) {
    chatstore.joinRoom([user, userstore.userData.email])
  }
}
</script>
