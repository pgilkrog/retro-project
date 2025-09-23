import Phaser from 'phaser'
import PlayerController from './entities/player/PlayerController'
import { Bullet } from './objects/Bullet'
import NPCController from './entities/npcs/NPCController'
import EnemyController from './entities/enemies/EnemyController'
import { createKeyInputs, getKeyInputs } from '../helpers/keyInputs'
import DialogController from '../Dialog/DialogController'
// import { debugDraw } from '@/phaser/utils/debug'

export default class Game extends Phaser.Scene {
  private player: PlayerController | undefined
  private enemies: EnemyController[] = []
  private npcs: NPCController[] = []
  private dialogController: DialogController
  private testKeyPressed: boolean = false

  constructor() {
    console.log('gamescene ran')
    super({ key: 'PlayScene' })
    this.dialogController = DialogController.getInstance(this)
  }

  create() {
    this.scene.launch('ui')
    this.scene.launch('dialog')
    createKeyInputs(this)
    this.dialogController.create()

    this.generateLevel()
  }

  generateLevel() {
    const map = this.make.tilemap({ key: 'testMap' })
    const tileset = map.addTilesetImage('Tileset', 'tiles')
    const tilesetCollider = map.addTilesetImage('colliderImg', 'collide')
    const pathfindingTiles = map.addTilesetImage('pathfindingboxes', 'pathfinding')

    if (tileset != undefined && tilesetCollider != undefined && pathfindingTiles != undefined) {
      const collideLayer = map.createLayer('Collider', tilesetCollider)

      if (collideLayer != undefined) {
        collideLayer.setCollisionByProperty({ Collide: true })
        this.matter.world.convertTilemapLayer(collideLayer)
      }

      map.createLayer('Walls', tileset)
      map.createLayer('Ground', tileset)
    }

    const objectLayer = map.getObjectLayer('Objects')

    if (objectLayer != undefined) {
      objectLayer.objects.forEach((objectData) => {
        const { x = 0, y = 0, name = '' } = objectData

        switch (name) {
          case 'player-spawn':
            this.createPlayer(x, y)
            break
          case 'enemy_spawn_fighter':
            this.createEnemy(x, y)
            break
          case 'npc_spawn':
            this.createNPC(x, y)
            break
        }
      })
    }
  }

  createPlayer(x: number, y: number) {
    this.player = new PlayerController(this, x, y)
  }

  createEnemy(x: number, y: number) {
    const newEnemy = new EnemyController(this, 'enemy_fighter', x, y, 100)

    newEnemy.sprite.setOnCollide((data: MatterJS.ICollisionPair) => {
      const other = (data.bodyB as any).gameObject || (data.bodyA as any).gameObject

      if (other instanceof Bullet && other.getOwner() === 'player') {
        console.log('enemy hit by bullet')
        newEnemy.takeDamage(25)
        // newEnemy.setState('hurt')
      }
    })

    this.enemies.push(newEnemy)
  }

  createNPC(x: number, y: number) {
    const newNPC = new NPCController(this, 'enemy_fighter', x, y, 100)
    this.npcs.push(newNPC)
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
        if (
          getKeyInputs()['keyE'].isDown === true &&
          this.dialogController.getDialogIsActive() === false
        ) {
          this.dialogController.initiateDialog('npc')
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
        if (
          getKeyInputs()['keyE'].isDown === true &&
          this.dialogController.getDialogIsActive() === false
        ) {
          console.log('enemy dialog called')
          this.dialogController.initiateDialog('gangster')
        }
      }
    })

    if (getKeyInputs()['keyK'].isDown === true && this.testKeyPressed === false) {
      this.testKeyPressed = true
      this.player?.takeDamage(100)
    }
  }
}
