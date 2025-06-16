import { Scene } from 'phaser'
import { io, Socket } from 'socket.io-client'

const api = import.meta.env.VITE_BASE_URL

interface PlayerSprites {
  [id: string]: Phaser.GameObjects.Arc
}

export default class Game extends Scene {
  socket: Socket | undefined
  players: PlayerSprites = {}
  myId: string | undefined = ''

  private keyInputs: {
    [key: string]: Phaser.Input.Keyboard.Key
  } = {}

  constructor() {
    super({ key: 'Game' })
  }

  create = () => {
    this.createKeyInputs(this)
    this.socket = io(api.replace('/api', ''))

    this.socket.on('connect', () => {
      this.myId = this.socket?.id
    })

    this.socket?.emit('joinGame', this.myId)

    this.socket.on('currentPlayers', (players) => {
      for (const id in players) {
        this.addPlayer(players[id])
      }
    })

    this.socket.on('newPlayer', (player) => {
      this.addPlayer(player)
    })

    this.socket.on('playerMoved', (data) => {
      const player = this.players[data.id]
      if (player != undefined) {
        player.setPosition(data.x, data.y)
      }
    })

    this.socket.on('playerDisconnected', (id) => {
      this.players[id].destroy()
      delete this.players[id]
    })

    // this.input.keyboard?.on('keydown', this.handleMovement.bind(this))

    this.events.on(Phaser.Scenes.Events.SHUTDOWN, () => {
      this.socket?.disconnect()
    })
  }

  update() {
    if (this.keyInputs['keyW']?.isDown) {
      this.handleMovement('up')
    }

    if (this.keyInputs['keyS']?.isDown) {
      this.handleMovement('down')
    }

    if (this.keyInputs['keyA']?.isDown) {
      this.handleMovement('left')
    }

    if (this.keyInputs['keyD']?.isDown) {
      this.handleMovement('right')
    }

    if (this.keyInputs['keySpace']?.isDown) {
      this.handleMovement('space')
    }
  }

  addPlayer(player: { id: string; x: number; y: number }) {
    const color = player.id === this.myId ? 0x00ff00 : 0xff0000
    const circle = this.add.circle(player.x, player.y, 20, color)
    this.players[player.id] = circle
  }

  handleMovement(key: string) {
    if (this.myId == undefined) {
      return
    }

    const me = this.players[this.myId]

    if (me == undefined) {
      return
    }

    const speed = 3
    let moved = false

    switch (key) {
      case 'up':
        me.y -= speed
        moved = true
        break
      case 'down':
        me.y += speed
        moved = true
        break
      case 'left':
        me.x -= speed
        moved = true
        break
      case 'right':
        me.x += speed
        moved = true
        break
      case 'space':
        console.log('Space key pressed')
        break
    }

    if (moved === true) {
      this.socket?.emit('move', { x: me.x, y: me.y })
    }
  }

  private createKeyInputs(scene: Phaser.Scene) {
    this.keyInputs['keyA'] = scene.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
    this.keyInputs['keyD'] = scene.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
    this.keyInputs['keyW'] = scene.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.UP)
    this.keyInputs['keyS'] = scene.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN)
    this.keyInputs['keySpace'] = scene.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
  }
}
