import { defineStore } from "pinia";
import { io } from "socket.io-client";
import { ref } from 'vue'

export const chatStore = defineStore("chatStore",() => {
  const socket = io('http://localhost:4000')
  const chatMessages = ref<ChatMessage[]>([])

  interface ChatMessage {
    id: number;
    text: string;
    sender: string;
    room: string;
  }

  const init = () => {
    socket.on('chatMessage', (message: ChatMessage) => {
      chatMessages.value.push(message);
    });
  }

  const joinRoom = (room: string) => {
    socket.emit('joinRoom', room)
  }

  const sendMessage = (message: ChatMessage, room: any) => {
    socket.emit('chatMessage', { roomName: room.roomName, ...message})
    console.log("messages", chatMessages)
  }

  return {
    chatMessages,
    init,
    joinRoom,
    sendMessage
  }
})