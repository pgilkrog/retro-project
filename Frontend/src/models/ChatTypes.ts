
export interface IChatMessage {
  id: number
  text: string
  sender: string
  room: string
}

export interface IChatRoom {
  id: number,
  roomName: string,
  participants: string[]
  isActive: boolean
  messages: IChatMessage[]
}