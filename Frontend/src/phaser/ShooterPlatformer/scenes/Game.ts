import Phaser from 'phaser'
import PlayerController from './entities/player/PlayerController'
import EnemyFighter from './entities/enemies/EnemyFigther'
import { Bullet } from './objects/Bullet'
import NPCController from './entities/npcs/NPCController'
import EnemyController from './entities/enemies/EnemyController'
// import { debugDraw } from '@/phaser/utils/debug'

export default class Game extends Phaser.Scene {
  private player: PlayerController | undefined
  private enemies: EnemyController[] = []
  private npcs: NPCController[] = []

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
    }

    const objectLayer = map.getObjectLayer('Objects')

    if (objectLayer != undefined) {
      objectLayer.objects.forEach((objectData) => {
        const { x = 0, y = 0, name = '' } = objectData

        if (name === 'player-spawn') {
          this.player = new PlayerController(this, x, y)
        } else if (name === 'enemy_spawn_fighter') {
          const newEnemy = new EnemyFighter(this, x, y, 100)

          newEnemy.sprite?.setOnCollide((data: MatterJS.ICollisionPair) => {
            const other = (data.bodyB as any).gameObject || (data.bodyA as any).gameObject

            if (other instanceof Bullet) {
              newEnemy.takeDamage(25)
            }
          })

          this.enemies.push(newEnemy)
        } else if (name === 'npc_spawn') {
          const newNPC = new NPCController(this, 'enemy_fighter', x, y, 100)
          this.npcs.push(newNPC)
        }
      })
    }

    // this.matter.world.on('collisionstart', function (event, bodyA, bodyB) {
    //   console.log('collision', event, bodyA, bodyB)
    // })
  }

  update(t: number, dt: number) {
    this.player?.update(dt)
    this.enemies.forEach((enemy) => enemy.update(dt))
    this.npcs.forEach((enemy) => enemy.update(dt))
  }
}
