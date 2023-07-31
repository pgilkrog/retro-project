import { defineStore } from "pinia"
import { io } from "socket.io-client"
import { ref } from 'vue'
import { userStore } from './userStore'
import axios from 'axios'
import type { IChatMessage, IChatRoom } from '@/models'

export const chatStore = defineStore("chat",() => {
  const userstore = userStore()
  const socket = io('http://localhost:4000')

  const chatMessages = ref<IChatMessage[]>([])
  const onlineUsers = ref<string[]>([])
  const activeRooms = ref<IChatRoom[]>([])

  const init = async () => {
    await authendicate(userstore.userData?.email!)

    socket.on('userOnline', (userInfo: string[]) => {
      onlineUsers.value = userInfo
    })

    socket.on('userOffline', (userInfo: string[]) => {
      onlineUsers.value = userInfo
    })

    socket.on('chatMessage', (message: IChatMessage) => {
      debugger
      let tempRoom = activeRooms.value.find(room => room.roomName === message.room)
      if(tempRoom === undefined) return
      tempRoom.messages.push(message)
      
      chatMessages.value.push(message)
    })

    setTimeout(() => {
      axios.get('http://localhost:4000/api/online-users').then((data) => {
        onlineUsers.value = data.data
      })
    }, 50)
  }

  const authendicate = async (userEmail: string) => {
    await socket.emit('authendicate', userEmail)
  }

  const joinRoom = (users: string[]) => {
    let sortedUsers = users.sort((a: string, b: string) => a.localeCompare(b))
    socket.emit('joinRoom', sortedUsers)
    activeRooms.value.push({
      id: 1,
      isActive: true,
      messages: [],
      participants: sortedUsers,
      roomName: sortedUsers.join('-')
    } as IChatRoom)
  }

  const sendMessage = (message: IChatMessage, room: any) => {
    socket.emit('chatMessage', { roomName: room.participants, ...message })
    chatMessages.value.push(message)
    // socket.emit('chatMessage', { roomName: roomT.roomName, ...message})
    console.log("messages", chatMessages)
  }

  return {
    chatMessages,
    onlineUsers,
    activeRooms,
    init,
    joinRoom,
    sendMessage
  }
})