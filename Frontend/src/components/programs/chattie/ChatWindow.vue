<template lang="pug">
WindowFrame(
  :program="program"
  :isMoveable="true"
  :variant="program.color"
  :showMenu="false"
)
  .d-flex.flex-column.bg-light.p-2
    p(v-for="(item, index) in chatstore.chatMessages") {{ item.text }}
  .d-flex.bg-shadow.p-2
    input(type="text" v-model="messageText").me-4
    button.btn(@click="sendMessage()") Send
</template>

<script setup lang="ts">
import { ref, onMounted, reactive, computed } from 'vue'
import { userStore } from '@/stores/userStore'
import { chatStore } from '@/stores/chatStore'
import type { IChatMessage, IChatRoom } from '@/models'

const emit = defineEmits([
  'sendMessage'
])

const props = defineProps({
  activeChat: Object
})

interface ChatMessage {
  id: number
  text: string
  sender: string
  room: string
}

const room = {
  roomName: "hejsa"
}

const program = {
  name: 'ChatWindow', 
  displayName: room.roomName + ' Chat window', 
  color: 'success', 
  image: 'bi-wechat', 
  isActive: true
}

const userstore = userStore()
const chatstore = chatStore()
const messageText = ref<string>("")

onMounted(() => {

})

const sendMessage = () => {
  const message: ChatMessage = {
    id: chatstore.chatMessages.length + 1,
    text: messageText.value,
    sender: userstore.userData?.email ?? "",
    room: props.activeChat!.participants.join('-')
  }
  chatstore.sendMessage(message, props.activeChat)
  messageText.value = ""
}

</script>

<style lang="sass" scoped>

</style>