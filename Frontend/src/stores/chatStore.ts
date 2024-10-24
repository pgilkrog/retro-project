import { defineStore } from 'pinia'
import { io } from 'socket.io-client'
import { ref } from 'vue'
import { userStore } from './userStore'
import axios from 'axios'
import type { IChatMessage, IChatRoom } from '@/models'

export const chatStore = defineStore('chat', () => {
  const userstore = userStore()
  const socket = io(import.meta.env.VITE_BASE_URL.replace('/api', ''))

  const onlineUsers = ref<string[]>([])
  const activeRooms = ref<IChatRoom[]>([])

  const init = async () => {
    await authendicate(userstore.userData?.email!)
    await initSocketListeners()
    await fetchOnlineUsers()
  }

  const initSocketListeners = () => {
    socket.on('userOnline', handleUser)
    socket.on('userOffline', handleUser)
    socket.on('chatMessage', handleChatMessage)
  }

  const handleUser = (userInfo: string[]) => {
    onlineUsers.value = userInfo
  }

  const handleChatMessage = (message: IChatMessage) => {
    const tempRoom = activeRooms.value.find((room) => room.roomName === message.room)
    if (tempRoom) {
      tempRoom.messages.unshift(message)
    }
  }

  const fetchOnlineUsers = async () => {
    try {
      const response = await axios.get(import.meta.env.VITE_BASE_URL + '/online-users')
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
      id: activeRooms.value.length,
      isActive: true,
      messages: [],
      participants: sortedUsers,
      roomName: sortedUsers.join('-'),
    }

    activeRooms.value.push(room)
  }

  const sendMessage = (message: IChatMessage, room: IChatRoom) => {
    socket.emit('chatMessage', { roomName: room.participants, ...message })
  }

  const chatDisconnect = () => {
    socket.emit('chatDisconnect', userstore.userData?.email)
  }

  return {
    onlineUsers,
    activeRooms,
    init,
    joinRoom,
    sendMessage,
    chatDisconnect,
  }
})
