<template>
  <WindowFrame
    :program="program"
    :is-moveable="true"
    :variant="program.color"
    :show-menu="false"
  >
    <div class="chattiechat bg-white w-full h-full">
      <div class="top flex justify-between bg-gray-200 bg-shadow p-2 mb-1">
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

      <div class="mt-8 px-4">
        <FriendsList
          titel="Online users"
          :user-list="onlineUsers"
          :is-online="true"
        />
        <FriendsList
          titel="Offline users"
          :user-list="offlineUsers"
          :is-online="false"
        />
      </div>
    </div>
  </WindowFrame>
  <ChatWindow
    v-for="(chat, index) in chatStore.activeRooms"
    :key="index"
    :active-chat="chat"
  />
</template>

<script setup lang="ts">
import type { IProgram, IUser } from '../../../models/index'
import { userStore } from '@/stores/userStore'
import { useChatStore } from '@/stores/chatStore'
import FriendsList from './FriendsList.vue'

const { program } = defineProps<{
  program: IProgram
}>()

const chatStore = useChatStore()
const userstore = userStore()

const onlineUsers = computed(() => getUserList(true))
const offlineUsers = computed(() => getUserList(false))

onMounted(async () => {
  await chatStore.init()
  await userstore.getAllUsers()
})

onUnmounted(() => {
  chatStore.chatDisconnect()
})

const getUserList = (bool: boolean) => {
  return (
    userstore.allUsers?.filter(
      (user: IUser) =>
        chatStore.onlineUsers.includes(user.email) === bool &&
        user.email !== userstore.userData?.email
    ) ?? []
  )
}
</script>
