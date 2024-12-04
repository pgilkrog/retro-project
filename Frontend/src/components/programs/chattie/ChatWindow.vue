<template>
  <WindowFrame
    :program
    :is-moveable="true"
    :variant="program.color"
    :show-menu="false"
  >
    <div class="message-wrapper flex flex-col bg-gray-300 p-2 h-[400] w-[500] overflow-y-scroll">
      <template
        v-for="(item, key) in activeChat.messages"
        :key="key"
      >
        <span
          style="text-align: right"
          v-if="item.sender !== userstore.userData?.email"
        >
          <p class="text-blue-500">{{ item.sender }}</p>
          <p v-html="item.text" />
        </span>
        <span
          class="text-left"
          v-else
        >
          <p class="text-green-500">{{ item.sender }}</p>
          <p v-html="item.text" />
        </span>
      </template>
    </div>
    <div class="flex bg-shadow p-2">
      <InputComponent
        v-model="messageText"
        @keydown.enter="sendMessage()"
      />
      <ButtonComponent
        @clicked="sendMessage()"
        text="Send"
      />
    </div>
  </WindowFrame>
</template>

<script setup lang="ts">
import { userStore, chatStore } from '@/stores'
import type { IChatMessage, IChatRoom } from '@/models'

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
  const idOfMessage = activeChat.messages.length

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
