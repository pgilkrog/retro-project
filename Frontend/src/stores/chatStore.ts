import { defineStore } from "pinia"
import { io } from "socket.io-client"
import { ref } from 'vue'
import { userStore } from './userStore'
import axios from 'axios'
import type { IChatMessage, IChatRoom } from '@/models'

export const chatStore = defineStore("chat",() => {
  const userstore = userStore()
  const socket = io('http://localhost:4000')

  // const chatMessages = ref<IChatMessage[]>([])
  const onlineUsers = ref<string[]>([])
  const activeRooms = ref<IChatRoom[]>([])

  const init = async () => {
    try {
      await authendicate(userstore.userData?.email!)
      await initSocketListeners()
      await fetchOnlineUsers()
    } catch (error) {
      console.log('Initialization error:', error)
    }

  }

  const initSocketListeners = () => {
    socket.on('userOnline', handleUserOnline)
    socket.on('userOffline', handleUserOffline)
    socket.on('chatMessage', handleChatMessage)
  }  

  const handleUserOnline = (userInfo: string[]) => {
    onlineUsers.value = userInfo
  }
  
  const handleUserOffline = (userInfo: string[]) => {
    onlineUsers.value = userInfo
  }
  
  const handleChatMessage = (message: IChatMessage) => {
    const tempRoom = activeRooms.value.find(room => room.roomName === message.room)
    if (tempRoom) {
      tempRoom.messages.unshift(message)
      // chatMessages.value.unshift(message)
    }
  }

  const fetchOnlineUsers = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/online-users')
      onlineUsers.value = response.data
    } catch (error) {
      console.error('Error fetching online users:', error)
    }
  }

  const authendicate = async (userEmail: string) => {
    await socket.emit('authendicate', userEmail)
  }

  const joinRoom = (users: string[]) => {
    let sortedUsers = users.sort((a: string, b: string) => a.localeCompare(b))
    socket.emit('joinRoom', sortedUsers)
    const room: IChatRoom = {
      id: 1,
      isActive: true,
      messages: [],
      participants: sortedUsers,
      roomName: sortedUsers.join('-')
    }
    activeRooms.value.push(room)
  }

  const sendMessage = (message: IChatMessage, room: any) => {
    socket.emit('chatMessage', { roomName: room.participants, ...message })
    // console.log("messages", chatMessages)
  }

  const chatDisconnect = () => {
    socket.emit('chatDisconnect', userstore.userData?.email)
  }

  return {
    // chatMessages,
    onlineUsers,
    activeRooms,
    init,
    joinRoom,
    sendMessage,
    chatDisconnect
  }
})