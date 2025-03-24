import Phaser from 'phaser'
import PlayerController from './entities/player/PlayerController'
import EnemyFighter from './entities/enemies/EnemyFigther'
import BulletController from './objects/BulletController'
import { debugDraw } from '@/phaser/utils/debug'

export default class Game extends Phaser.Scene {
  private player: PlayerController | undefined
  private enemies: EnemyFighter[] = []
  private bullets: BulletController | undefined

  constructor() {
    super({ key: 'PlayScene' })
  }

  create() {
    this.scene.launch('ui')

    const map = this.make.tilemap({ key: 'testMap' })
    const tileset = map.addTilesetImage('Tileset', 'tiles')
    const tilesetCollider = map.addTilesetImage('colliderImg', 'collide')

    if (tileset != undefined && tilesetCollider != undefined) {
      const collideLayer = map.createLayer('Collider', tilesetCollider)
      collideLayer?.setCollisionByProperty({ Collide: true })

      if (collideLayer != undefined) {
        this.matter.world.convertTilemapLayer(collideLayer)
      }
      map.createLayer('Walls', tileset)
      map.createLayer('Ground', tileset)
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

    this.bullets = new BulletController(this)
  }

  update(t: number, dt: number) {
    this.player?.update(dt)
    this.enemies.forEach((enemy) => enemy.update(dt))
  }
}
