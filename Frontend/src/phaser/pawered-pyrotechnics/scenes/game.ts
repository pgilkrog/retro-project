import { Scene } from 'phaser'
import { io, Socket } from 'socket.io-client'
import PlayerController from '../player/PlayerController'
import BombController from '../BombController'

const api = import.meta.env.VITE_BASE_URL

export default class Game extends Scene {
  private socket: Socket | undefined
  private myId: string | undefined = ''
  private solidWalls: Phaser.Tilemaps.TilemapLayer | undefined // <-- Add this line
  private breakableWalls: Phaser.Tilemaps.TilemapLayer | undefined // <-- Add this

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
  }

  update(dt: number) {
    this.thisPlayer?.update(dt)
  }

  addPlayer(player: { id: string; x: number; y: number }) {
    if (this.socket != undefined && player.id != this.myId) {
      this.playerList[player.id] = new PlayerController(this, player.x, player.y, this.socket)
    }
  }

  createWalls = () => {
    const map = this.make.tilemap({ key: 'map1' })
    const tileset = map.addTilesetImage('walls', 'walls', 64, 64)

    if (tileset != undefined) {
      const solidWalls = map.createLayer('SolidWalls', tileset)

      if (solidWalls != undefined) {
        this.solidWalls = solidWalls
        solidWalls.setCollisionByProperty({ collide: true })
        this.physics.add.collider(this.thisPlayer?.sprite!, solidWalls)
      }

      const breakableWalls = map.createLayer('BreakableWalls', tileset)

      if (breakableWalls != undefined) {
        this.breakableWalls = breakableWalls
        breakableWalls.setCollisionByProperty({ collide: true })

        // Randomize breakable walls: remove some tiles randomly
        breakableWalls.forEachTile((tile) => {
          if (tile.index !== -1 && Math.random() > 0.5) {
            // 50% chance to remove
            breakableWalls.removeTileAt(tile.x, tile.y)
          }
        })
      }
    }
  }

  createSockets = () => {
    this.socket = io(api.replace('/api', ''))

    this.socket.on('connect', () => {
      this.myId = this.socket?.id

      if (this.socket != undefined && this.socket.id != undefined) {
        this.thisPlayer = new PlayerController(this, 400, 400, this.socket)

        this.createWalls()

        this.bombController = new BombController(this, this.solidWalls, this.breakableWalls) // <-- Pass breakableWalls

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
