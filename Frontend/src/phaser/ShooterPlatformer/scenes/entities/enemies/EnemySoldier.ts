import { enemyAnims } from '../../../interfaces/enums'
import EnemyController from './EnemyController'

const enemy_soldier = 'enemy_soldier'

export default class EnemySoldier extends EnemyController {
  constructor(scene: Phaser.Scene, sprite: string, x: number, y: number, health: number) {
    super(scene, sprite, x, y, health)
  }

  create() {
    super.create()
  }

  update(dt: number) {
    super.update(dt)
  }

  createAnimations() {
    this.sprite.anims.create({
      key: enemyAnims.enemy_idle,
      frames: this.sprite?.anims.generateFrameNames(enemy_soldier, {
        start: 0,
        end: 12,
        prefix: 'idle_2_',
        suffix: '.png',
      }),
      repeat: -1,
      frameRate: 10,
    })

    this.sprite.anims.create({
      key: enemyAnims.enemy_walk,
      frames: this.sprite?.anims.generateFrameNames(enemy_soldier, {
        start: 0,
        end: 9,
        prefix: 'walk_',
        suffix: '.png',
      }),
      repeat: -1,
      frameRate: 10,
    })

    this.sprite.anims.create({
      key: enemyAnims.enemy_run,
      frames: this.sprite?.anims.generateFrameNames(enemy_soldier, {
        start: 0,
        end: 9,
        prefix: 'run_',
        suffix: '.png',
      }),
      repeat: -1,
      frameRate: 10,
    })

    this.sprite.anims.create({
      key: enemyAnims.enemy_dead,
      frames: this.sprite?.anims.generateFrameNames(enemy_soldier, {
        start: 0,
        end: 4,
        prefix: 'dead_',
        suffix: '.png',
      }),
      repeat: 0,
      frameRate: 10,
    })

    this.sprite.anims.create({
      key: enemyAnims.enemy_hurt,
      frames: this.sprite?.anims.generateFrameNames(enemy_soldier, {
        start: 0,
        end: 3,
        prefix: 'hurt_',
        suffix: '.png',
      }),
      repeat: 0,
      frameRate: 10,
    })

    this.sprite.anims.create({
      key: 'attack',
      frames: this.sprite?.anims.generateFrameNames(enemy_soldier, {
        start: 0,
        end: 5,
        prefix: 'attack_1_',
        suffix: '.png',
      }),
      repeat: 0,
      frameRate: 10,
    })
  }
}
