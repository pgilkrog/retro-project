import Phaser from 'phaser'
import PlayerController from './entities/player/PlayerController'
import { Bullet } from './objects/Bullet'
import NPCController from './entities/npcs/NPCController'
import EnemyController from './entities/enemies/EnemyController'
import { createKeyInputs, getKeyInputs } from '../helpers/keyInputs'
import { sharedInstance as events, CUSTOM_EVENTS } from './EventCenter'
import DialogController from '../Dialog/DialogController'
// import { debugDraw } from '@/phaser/utils/debug'

export default class Game extends Phaser.Scene {
  private player: PlayerController | undefined
  private enemies: EnemyController[] = []
  private npcs: NPCController[] = []
  private dialogIsActive: boolean = false
  private dialogController: DialogController

  constructor() {
    super({ key: 'PlayScene' })
    this.dialogController = DialogController.getInstance(this)
  }

  create() {
    this.scene.launch('ui')
    this.scene.launch('dialog')
    createKeyInputs(this)
    this.dialogController.create()

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
          const newEnemy = new EnemyController(this, 'enemy_fighter', x, y, 100)

          newEnemy.sprite.setOnCollide((data: MatterJS.ICollisionPair) => {
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
  }

  update(t: number, dt: number) {
    this.player?.update(dt)
    this.enemies.forEach((enemy) => enemy.update(dt))
    this.npcs.forEach((enemy) => enemy.update(dt))

    this.npcs.forEach((npc: NPCController) => {
      if (
        Phaser.Math.Distance.Between(
          this.player?.sprite.x ?? 1000,
          this.player?.sprite.y ?? 100,
          npc.sprite.x,
          npc.sprite.y
        ) < 50
      ) {
        if (getKeyInputs()['keyE'].isDown === true && this.dialogIsActive === false) {
          this.dialogIsActive = true
          this.dialogController.callDialog('npc')
        }
      }
    })

    this.enemies.forEach((enemy: EnemyController) => {
      if (
        Phaser.Math.Distance.Between(
          this.player?.sprite.x ?? 1000,
          this.player?.sprite.y ?? 100,
          enemy.sprite.x,
          enemy.sprite.y
        ) < 50
      ) {
        if (getKeyInputs()['keyE'].isDown === true && this.dialogIsActive === false) {
          this.dialogIsActive = true
          console.log('enemy dialog called')
          this.dialogController.callDialog('gangster')
        }
      }
    })
  }
}
