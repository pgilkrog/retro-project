<template>
  <WindowFrame
    :program="program"
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
          v-if="item.sender !== userstore.userData?.email"
          class="text-right"
        >
          <p class="text-blue-500">{{ item.sender }}</p>
          <p v-html="item.text" />
        </span>
        <span
          v-else
          class="text-left"
        >
          <p class="text-green-500">{{ item.sender }}</p>
          <p v-html="item.text" />
        </span>
      </template>
    </div>
    <div class="flex bg-shadow p-2">
      <InputComponent
        v-model="messageText"
        @keydown.enter="() => sendMessage()"
      />
      <ButtonComponent
        text="Send"
        @clicked="() => sendMessage()"
      />
    </div>
  </WindowFrame>
</template>

<script setup lang="ts">
import { userStore, useChatStore } from '@/stores'
import type { IChatMessage, IChatRoom } from '@/models'

const { activeChat } = defineProps<{
  activeChat: IChatRoom
}>()

const userstore = userStore()
const chatStore = useChatStore()

const messageText = ref<string>('')

const program = {
  name: 'ChatWindow',
  displayName: 'Chat window',
  color: 'success',
  image: 'fa-comment',
  isActive: true,
}

const sendMessage = () => {
  const idOfMessage = activeChat.messages.length

  const message: IChatMessage = {
    id: idOfMessage + 1,
    text: messageText.value,
    sender: userstore.userData?.email ?? '',
    room: activeChat.participants.join('-'),
  }

  chatStore.sendMessage(message, activeChat)
  messageText.value = ''
}
</script>
