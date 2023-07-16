<template lang="pug">
WindowFrame(
  :program="program"
  :isMoveable="true"
  :variant="program.color"
  :showMenu="false"
)
  .d-flex.flex-column.bg-light.p-2
    p(v-for="(item, index) in messages") {{ item.text }}
  .d-flex.bg-shadow.p-2
    input(type="text" v-model="messageText").me-4
    button.btn(@click="sendMessage()") Send
</template>

<script setup lang="ts">
import { ref, onMounted, reactive, computed } from 'vue'
import io from 'socket.io-client'
import { userStore } from '@/stores/userStore'
import { chatStore } from '@/stores/chatStore'

const emit = defineEmits([
  'sendMessage'
])

interface ChatMessage {
  id: number;
  text: string;
  sender: string;
  room: string;
}

const props = defineProps({
  socket: Object
})

const room = {
  roomName: "hejsa"
}

const program = ref({
  name: 'ChatWindow', 
  displayName: 'Chat window', 
  color: 'success', 
  image: 'bi-wechat', 
  isActive: true
})

const userstore = userStore()
const chatstore = chatStore()
const messageText = ref<string>("")
const messages = computed(() => chatstore.chatMessages)

onMounted(() => {
  chatstore.joinRoom(room.roomName)
})

const sendMessage = () => {
  const message: ChatMessage = {
    id: messages.value.length + 1,
    text: messageText.value,
    sender: userstore.userData?.email ?? "",
    room: room.roomName
  }
  chatstore.sendMessage(message, room.roomName)
  messageText.value = ""
}

</script>

<style lang="sass" scoped>

</style>