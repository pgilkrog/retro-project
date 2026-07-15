import { defineStore } from 'pinia'
import { io } from 'socket.io-client'
import { userStore } from './userStore'
import type { IChatMessage, IChatRoom } from '@/models'
import { get } from '@/helpers/httpHelper'

export const useChatStore = defineStore('chatStore', () => {
  const userstore = userStore()
  const socket = io(import.meta.env.VITE_BASE_URL.replace('/api', ''))

  const onlineUsers = ref<string[]>([])
  const activeRooms = ref<IChatRoom[]>([])

  const init = async () => {
    if (userstore.userData !== undefined) {
      authendicate(userstore.userData.email)
      initSocketListeners()
      await fetchOnlineUsers()
    }
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
    if (tempRoom != undefined) {
      tempRoom.messages.unshift(message)
    }
  }

  const fetchOnlineUsers = async () => {
    const response = await get<string[]>('/online-users')
    onlineUsers.value = response
  }

  const authendicate = (userEmail: string) => {
    socket.emit('authendicate', userEmail)
  }

  const joinRoom = (users: string[]) => {
    const sortedUsers = users.sort((user1: string, user2: string) => user1.localeCompare(user2))

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
    if (message.text !== '') {
      socket.emit('chatMessage', { roomName: room.participants, ...message })
    }
  }

  const chatDisconnect = () => {
    socket.emit('chatDisconnect', userstore.userData?.email)
  }

  return {
    // States
    onlineUsers,
    activeRooms,

    // Actions
    init,
    joinRoom,
    sendMessage,
    chatDisconnect,
  }
})
