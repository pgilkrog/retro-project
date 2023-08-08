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
const activeRooms: { [room: string]: string[] } = {}

export function setupSocketIO(httpServer: any, app: any) {
    const io = new Server(httpServer, {
        cors: {
            origin: 'http://127.0.0.1:5173',
            methods: ['GET', 'POST', 'PUT'],
        },
    })

    io.on('connection', async (socket) => {
        console.log('a user connected')

        socket.on('authendicate', (email: string) => {
            const userInfo: UserInfo = {
                email: email,
                socketId: socket.id,
            }

            console.log('user authenticated', email)

            const userIndex = onlineUsers.find((user) => user.email === email)
            if (!userIndex) {
                onlineUsers.push(userInfo)
                socket.broadcast.emit('userOnline', onlineUsers.map((user) => user.email))
            }
        })

        socket.on('joinRoom', (roomUsers: string[]) => {
            console.log("USERS", roomUsers)
            const usersOnline = roomUsers.every((user) => onlineUsers.some((onlineUser) => onlineUser.email === user))

            if (usersOnline) {
                socket.join(roomUsers.join('-'))
                
                io.to(roomUsers.join('-')).emit('chatMessage', {
                    id: -1,
                    text: `Room created with ${roomUsers.join(' and ')}`,
                    sender: 'System',
                })
            }
        })

        socket.on('chatMessage', (data: ChatMessage) => {
            const { roomName } = data
            io.to(roomName.join('-')).emit('chatMessage', data)
            console.log("messages", data)
        })

        socket.on('disconnect', (email: string) => {
            const userIndex = onlineUsers.findIndex((user) => user.email === email)
            if (userIndex !== -1) {
              const disconnectedUser = onlineUsers[userIndex]
              onlineUsers.splice(userIndex, 1)
        
              socket.broadcast.emit('userOffline', disconnectedUser.email)
            }
        })
    })

  // API endpoint to get the list of online users
  app.get('/api/online-users', (req: any, res: any) => {
    const onlineUserEmails = onlineUsers.map((user) => user.email)
    res.json(onlineUserEmails)
  })
}

