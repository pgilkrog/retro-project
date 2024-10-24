<template lang="pug">
WindowFrame(
  :program="program"
  :isMoveable="true"
  :variant="program.color"
  :showMenu="false"
)
  .message-wrapper(class="flex flex-col bg-gray-300 p-2 h-[400] w-[500] overflow-y-scroll")
    template(v-for="(item, key) in activeChat.messages" :key) 
      span(style="text-align: right" v-if="item.sender !== userstore.userData.email") 
        p.text-blue-500 {{ item.sender }}
        p(v-html="item.text")
      span(style="text-align: left" v-else)
        p(class="text-green-500") {{ item.sender }}
        p(v-html="item.text")
  div(class="flex bg-shadow p-2")
    InputComponent(v-model="messageText" @keydown.enter="sendMessage()")
    ButtonComponent(@clicked="sendMessage()" text="Send")
</template>

<script setup lang="ts">
import { userStore } from '@/stores/userStore'
import { chatStore } from '@/stores/chatStore'
import type { IChatMessage, IChatRoom } from '@/models'

const emit = defineEmits<{
  sendMessage: []
}>()

const { activeChat } = defineProps<{
  activeChat: IChatRoom
}>()

const program = {
  name: 'ChatWindow',
  displayName: 'Chat window',
  color: 'success',
  image: 'bi-wechat',
  isActive: true,
}

const userstore = userStore()
const chatstore = chatStore()
const messageText = ref<string>('')

const sendMessage = () => {
  const idOfMessage =
    activeChat !== undefined && activeChat.messages !== undefined ? activeChat.messages.length : 0

  const message: IChatMessage = {
    id: idOfMessage + 1,
    text: messageText.value,
    sender: userstore.userData?.email ?? '',
    room: activeChat.participants.join('-'),
  }

  chatstore.sendMessage(message, activeChat)
  messageText.value = ''
}
</script>
