import { Scene } from 'phaser'
import { io, Socket } from 'socket.io-client'
import PlayerController from '../player/PlayerController'
import BombController from '../BombController'

const api = import.meta.env.VITE_BASE_URL

export default class Game extends Scene {
  private socket: Socket | undefined
  private myId: string | undefined = ''
  private solidWalls: Phaser.Physics.Arcade.StaticGroup | undefined

  private thisPlayer: PlayerController | undefined
  private playerList: Record<string, PlayerController> = {}

  private bombController: BombController | undefined

  constructor() {
    super({ key: 'Game' })
  }

  create = async () => {
    this.createSockets()

    this.events.on(Phaser.Scenes.Events.SHUTDOWN, () => {
      this.socket?.disconnect()
    })

    this.bombController = new BombController(this)
  }

  update(dt: number) {
    this.thisPlayer?.update(dt)
  }

  addPlayer(player: { id: string; x: number; y: number }) {
    if (this.socket != undefined && player.id != this.myId) {
      this.playerList[player.id] = new PlayerController(this, player.x, player.y, this.socket)
    }
  }

  createSolidWalls = () => {
    this.solidWalls = this.physics.add.staticGroup()

    const tileSize = 64
    const cols = 15 // width in tiles
    const rows = 15 // height in tiles
    const startX = 0 // starting X position
    const startY = 0 // starting Y position

    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const isBorder = y === 0 || y === rows - 1 || x === 0 || x === cols - 1
        const isInnerBlock = y % 2 === 0 && x % 2 === 0

        if (isBorder || isInnerBlock) {
          const wall = this.solidWalls.create(
            startX + x * tileSize,
            startY + y * tileSize,
            'solidwall'
          )
          wall.setScale(2)
          wall.setOrigin(0)
          wall.setSize(64, 64)
          wall.setOffset(16, 16)
        }
      }
    }

    this.physics.add.collider(this.thisPlayer?.sprite!, this.solidWalls)
  }

  createSockets = () => {
    this.socket = io(api.replace('/api', ''))

    this.socket.on('connect', () => {
      this.myId = this.socket?.id

      if (this.socket != undefined && this.socket.id != undefined) {
        this.thisPlayer = new PlayerController(this, 400, 400, this.socket)

        this.createSolidWalls()

        if (
          this.thisPlayer != undefined &&
          this.thisPlayer.sprite != undefined &&
          this.bombController != undefined &&
          this.bombController.bombs != undefined &&
          this.bombController.explosions != undefined
        ) {
          this.physics.add.collider(this.thisPlayer.sprite, this.bombController.bombs)

          this.physics.add.collider(
            this.thisPlayer.sprite,
            this.bombController.explosions,
            (body1, body2) => {
              if (body1 === this.thisPlayer?.sprite || body2 === this.thisPlayer?.sprite) {
                this.thisPlayer?.setDeathState()
                this.socket?.emit('playerDied', this.myId)
              }
            }
          )
        }
      }
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
      const tempPlayer = this.playerList[data.id]
      if (tempPlayer != undefined && data.id != this.myId) {
        tempPlayer.sprite?.setPosition(data.x, data.y)
      }
    })

    this.socket.on('playerDisconnected', (id) => {
      delete this.playerList[id]
    })

    this.socket.on('bombPlaced', (data) => {
      const getBomb = this.bombController?.getBomb(data.x, data.y)

      if (getBomb != undefined) {
        this.bombController?.activateBomb(getBomb)
      }
    })

    this.socket.on('playerDied', (id) => {
      const tempPlayer = this.playerList[id]

      if (tempPlayer != undefined) {
        tempPlayer.setDeathState()
      }
    })
  }
}
