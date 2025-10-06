import { collisionCategories } from '../../../helpers/collisionCategories'
import { enemyAnims, enemyStates } from '../../../interfaces/enums'
import Entity from '../Entity'

const enemy_fighter = 'enemy_fighter'

export default class EnemyController extends Entity {
  private walkDirection: number = 2
  private changeDirectionTimer: number = 0
  private target: Phaser.Physics.Matter.Sprite

  constructor(scene: Phaser.Scene, sprite: string, x: number, y: number, health: number) {
    super(scene, sprite, x, y, undefined, health)
  }

  create() {
    this.sprite.setRectangle(24, 64).setFixedRotation().setFriction(0.5)

    this.sprite.setCollisionCategory(collisionCategories.enemy)
    this.sprite.setCollidesWith([1, collisionCategories.bullet])
  }

  update(dt: number) {
    this.stateMachine.update(dt)
    this.sprite.setDisplayOrigin(60, 96)
  }

  public setTarget(target: Phaser.Physics.Matter.Sprite) {
    this.target = target
    this.stateMachine.setState(enemyStates.enemy_aggresive)
  }

  setStates() {
    super.setStates()
    this.stateMachine
      .addState(enemyStates.enemy_alert, {
        onEnter: this.alertOnEnter,
        onUpdate: this.alertOnUpdate,
      })
      .addState(enemyStates.enemy_aggresive, {
        onEnter: this.aggresiveOnEnter,
        onUpdate: this.aggresiveOnUpdate,
      })
  }

  idleOnEnter() {
    this.sprite.setVelocityX(0)
    this.sprite.play(enemyAnims.enemy_idle)
    this.walkDirection = Phaser.Math.Between(-1, 1)
    this.sprite.setFlipX(this.walkDirection < 0)
    this.changeDirectionTimer = 0
  }
  idleOnUpdate(dt: number) {
    this.changeDirectionTimer += dt

    if (this.changeDirectionTimer >= 2000) {
      this.stateMachine.setState(enemyStates.enemy_walk)
    }
  }

  walkOnEnter() {
    this.sprite?.play(enemyAnims.enemy_walk)
    this.changeDirectionTimer = 0
  }
  walkOnUpdate(dt: number) {
    this.changeDirectionTimer += dt

    // Multiply direction by speed and dt (dt is usually in ms, so divide by 1000)
    this.sprite?.setVelocityX(this.walkDirection * this.speed * (dt / 10))

    if (this.changeDirectionTimer >= 2000) {
      this.stateMachine?.setState(enemyStates.enemy_idle)
    }
  }

  alertOnEnter() {}
  alertOnUpdate() {}

  aggresiveOnEnter() {
    this.sprite.play(enemyAnims.enemy_run)
  }
  aggresiveOnUpdate(dt: number) {
    const direction = this.target.x - this.sprite.x
    this.sprite.setVelocityX((Math.sign(direction) * this.runSpeed) / dt)
  }

  hurtOnEnter() {
    this.sprite.play(enemyAnims.enemy_hurt).once('animationcomplete', () => {
      if (this.health <= 0) {
        this.stateMachine.setState(enemyStates.enemy_dead)
      } else {
        this.stateMachine.setState(enemyStates.enemy_aggresive)
      }
    })
  }
  hurtOnUpdate() {}

  // make the npc walk along the path
  startWalkAnimation(path: any) {}

  createAnimations() {
    this.sprite.anims.create({
      key: enemyAnims.enemy_idle,
      frames: this.sprite?.anims.generateFrameNames(enemy_fighter, {
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
      frames: this.sprite?.anims.generateFrameNames(enemy_fighter, {
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
      frames: this.sprite?.anims.generateFrameNames(enemy_fighter, {
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
      frames: this.sprite?.anims.generateFrameNames(enemy_fighter, {
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
      frames: this.sprite?.anims.generateFrameNames(enemy_fighter, {
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
      frames: this.sprite?.anims.generateFrameNames(enemy_fighter, {
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
