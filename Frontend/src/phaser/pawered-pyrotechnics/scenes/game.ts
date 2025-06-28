import { Scene } from 'phaser'
import { io, Socket } from 'socket.io-client'
import PlayerController from '../player/PlayerController'
import BombController from '../BombController'
import type CardController from '../CardController'

const api = import.meta.env.VITE_BASE_URL

interface MapCords {
  x: number
  y: number
}

export default class Game extends Scene {
  private socket: Socket | undefined
  private myId: string | undefined = ''
  private solidWalls: Phaser.Tilemaps.TilemapLayer | undefined
  private breakableWalls: Phaser.Tilemaps.TilemapLayer | undefined

  private player: PlayerController | undefined
  private playerList: Record<string, PlayerController> = {}

  private bombController: BombController | undefined
  private cardController: CardController | undefined

  private map: Phaser.Tilemaps.Tilemap | undefined
  private tileset: Phaser.Tilemaps.Tileset | undefined
  private mapCors: MapCords[] = []
  private spawnPoints: MapCords[] = []

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
    this.player?.update(dt)
  }

  addPlayer(player: { id: string; x: number; y: number }) {
    if (this.socket != undefined && player.id != this.myId) {
      this.playerList[player.id] = new PlayerController(this, player.x, player.y, this.socket)
    }
  }

  createWalls = () => {
    this.map = this.make.tilemap({ key: 'map1' })
    this.tileset = this.map.addTilesetImage('walls', 'walls', 64, 64) ?? undefined

    if (this.tileset != undefined) {
      const solidWalls = this.map.createLayer('solidWalls', this.tileset)

      if (solidWalls != undefined) {
        this.solidWalls = solidWalls
        solidWalls.setCollisionByProperty({ collide: true })
        this.physics.add.collider(this.player?.sprite!, solidWalls)
      }

      if (this.player?.playerNumber === 1) {
        this.createBreakableWalls(undefined)
      } else {
        this.createBreakableWalls(this.mapCors)
      }
    }
  }

  createBreakableWalls = (mapCords: any | undefined) => {
    if (this.map != undefined && this.tileset != undefined) {
      const breakableWalls = this.map.createLayer('breakableWalls', this.tileset)

      if (breakableWalls != undefined) {
        this.physics.add.collider(this.player?.sprite!, breakableWalls)
        this.breakableWalls = breakableWalls
        breakableWalls.setCollisionByProperty({ collide: true })

        if (mapCords != undefined) {
          console.log(mapCords)
          // Use provided coordinates to set breakable walls
          mapCords.breakableWalls.forEach((cord: any) => {
            breakableWalls.removeTileAt(cord.x, cord.y)
          })
        } else {
          console.log('HIT THIS', this.player?.playerNumber)
          // Randomize breakable walls: remove some tiles randomly
          const breakableWallTiles: MapCords[] = []

          breakableWalls.forEachTile((tile) => {
            if (tile.index !== -1 && Math.random() > 0.5) {
              // 50% chance to remove
              breakableWalls.removeTileAt(tile.x, tile.y)
              breakableWallTiles.push({ x: tile.x, y: tile.y })
            }
          })

          this.socket?.emit('mapCreated', { breakableWalls: breakableWallTiles })
        }
      }
    }
  }

  createSockets = () => {
    this.socket = io(api.replace('/api', ''))

    this.socket.on('connect', () => {
      this.myId = this.socket?.id

      if (this.socket != undefined && this.socket.id != undefined) {
        this.player = new PlayerController(this, 400, 400, this.socket)
        this.socket?.emit('joinGame')
      }
    })

    this.socket.on('startGame', () => {
      this.createWalls()
      this.map?.getObjectLayer('playerSpawns')?.objects.forEach((data) => {
        this.spawnPoints.push({ x: data.x ?? 0, y: data.y ?? 0 })
      })

      this.player?.sprite?.setPosition(
        this.spawnPoints[this.player.playerNumber - 1].x,
        this.spawnPoints[this.player.playerNumber - 1].y
      )

      this.bombController = new BombController(this, this.solidWalls, this.breakableWalls)

      if (
        this.player != undefined &&
        this.player.sprite != undefined &&
        this.bombController != undefined &&
        this.bombController.bombs != undefined &&
        this.bombController.explosions != undefined
      ) {
        this.physics.add.collider(this.player.sprite, this.bombController.bombs)

        this.physics.add.collider(
          this.player.sprite,
          this.bombController.explosions,
          (body1, body2) => {
            if (body1 === this.player?.sprite || body2 === this.player?.sprite) {
              this.player?.setDeathState()
              this.socket?.emit('playerDied', this.myId)
            }
          }
        )
      }
    })

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

    this.socket.on('mapCords', (data) => {
      console.log(data)
      this.mapCors = data
    })

    this.socket.on('yourPlayerNumber', (playerNumber: number) =>
      this.player?.setPlayerNumber(playerNumber)
    )
  }
}
