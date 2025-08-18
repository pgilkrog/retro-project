import Phaser from 'phaser'
import PlayerController from './entities/player/PlayerController'
import EnemyFighter from './entities/enemies/EnemyFigther'
import BulletController from './objects/BulletController'
import { debugDraw } from '@/phaser/utils/debug'
import * as EasyStar from 'easystarjs'

export default class Game extends Phaser.Scene {
  private player: PlayerController | undefined
  private enemies: EnemyFighter[] = []
  private bullets: BulletController | undefined
  private easystar = new EasyStar.js()

  constructor() {
    super({ key: 'PlayScene' })
  }

  create() {
    this.scene.launch('ui')

    const map = this.make.tilemap({ key: 'testMap' })
    const tileset = map.addTilesetImage('Tileset', 'tiles')
    const tilesetCollider = map.addTilesetImage('colliderImg', 'collide')
    const pathfindingTiles = map.addTilesetImage('pathfindingboxes', 'pathfinding')

    if (tileset != undefined && tilesetCollider != undefined && pathfindingTiles != undefined) {
      const collideLayer = map.createLayer('Collider', tilesetCollider)
      collideLayer?.setCollisionByProperty({ Collide: true })

      if (collideLayer != undefined) {
        this.matter.world.convertTilemapLayer(collideLayer)
      }
      map.createLayer('Walls', tileset)
      map.createLayer('Ground', tileset)
      map.createLayer('Pathfinding', pathfindingTiles)
    }

    const objectLayer = map.getObjectLayer('Objects')

    if (objectLayer != undefined) {
      objectLayer.objects.forEach((objectData) => {
        const { x = 0, y = 0, name = '' } = objectData

        if (name === 'player-spawn') {
          this.player = new PlayerController(this, x, y)
        }

        if (name === 'enemy_spawn_fighter') {
          this.enemies.push(new EnemyFighter(this, x, y))
        }
      })
    }
    // easyStarInit(map.getLayer('Pathfinding')?.data, this.enemies, this, map)

    this.bullets = new BulletController(this)
    this.setupEasystar(map)
  }

  update(t: number, dt: number) {
    this.player?.update(dt)
    this.enemies.forEach((enemy) => enemy.update(dt))
  }

  private setupEasystar(map: any) {
    const grid: number[][] = []
    // Loop through all tiles in the layer
    map.getLayer('Pathfinding').data.forEach((row: any) => {
      const rowData: any[] = []
      row.forEach((tile: any) => {
        // Sets the cost of the tile
        const isWalkable = tile.properties ? tile.properties.cost : -1
        rowData.push(isWalkable === undefined ? -1 : isWalkable)
        // Set tile cost accordingly
        this.easystar.setTileCost(isWalkable, isWalkable)
      })
      grid.push(rowData)
    })
    this.easystar.setGrid(grid)
    this.easystar.setAcceptableTiles([1, 2, 3, 4, 5, 6, 7, 8])
  }

  private findPath(start: { x: number; y: number }, end: { x: number; y: number }) {
    this.easystar.findPath(start.x, start.y, end.x, end.y, (path: any) => {
      if (path) {
        console.log('Path found:', path)
        // Use the path to move your NPC
      } else {
        console.log('Path not found')
      }
    })
    this.easystar.calculate()
  }
}
