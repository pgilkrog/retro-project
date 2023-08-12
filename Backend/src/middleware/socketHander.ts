import { Server } from 'socket.io';

interface ChatMessage {
    roomName: string[];
    text: string;
    sender: string;
}

interface UserInfo {
    email: string;
    socketId: string;
}

const onlineUsers: UserInfo[] = []

export function setupSocketIO(httpServer: any, app: any) {
    const io = new Server(httpServer, {
        cors: {
            origin: 'http://127.0.0.1:5173',
            methods: ['GET', 'POST', 'PUT'],
        },
    })

    io.on('connection', async (socket) => {
        socket.on('authendicate', handleAuthendication(socket))
        socket.on('joinRoom', handleJoinRoom(socket, io))
        socket.on('chatMessage', handleChatMessage(socket, io))
        socket.on('chatDisconnect', handleDisconnect(socket))
    })

  // API endpoint to get the list of online users
  app.get('/api/online-users', (req: any, res: any) => {
    const onlineUserEmails = onlineUsers.map((user) => user.email)
    res.json(onlineUserEmails)
  })
}

const handleAuthendication = (socket: any) => (email: string) => {
  const userInfo: UserInfo = {
    email: email,
    socketId: socket.id,
  }

  const userIndex = onlineUsers.find((user) => user.email === email)
  if (!userIndex) {
    onlineUsers.push(userInfo)
    socket.broadcast.emit('userOnline', onlineUsers.map((user) => user.email))
  }
}

const handleJoinRoom = (socket: any, io: any) => (roomUsers: string[]) => {
  const usersOnline = roomUsers.every((user) => onlineUsers.some((onlineUser) => onlineUser.email === user))

  if (usersOnline) {
    socket.join(roomUsers.join('-'))
        
    io.to(roomUsers.join('-')).emit('chatMessage', {
      id: -1,
      text: `Room created with ${roomUsers.join(' and ')}`,
      sender: 'System',
    })
  }
}

const handleChatMessage = (socket: any, io: any) => (data: ChatMessage) => {
  // Get the roomName from the data
  const { roomName } = data
  if (data !== undefined)
    io.to(roomName.join('-')).emit('chatMessage', data)
}

const handleDisconnect = (socket: any) => (email: string) => {
  // Get the index of 
  console.log("DISCONNECT HIT")
  const userIndex = onlineUsers.findIndex((user) => user.email === email)
  console.log(userIndex)
  if (userIndex !== -1) {
    const disconnectedUser = onlineUsers[userIndex]
    onlineUsers.splice(userIndex, 1)

    socket.broadcast.emit('userOffline', disconnectedUser.email)
  }
}