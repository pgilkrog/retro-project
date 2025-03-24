import Entity from '../Entity'

enum enemyStates {
  enemy_idle = 'enemy_idle',
  enemy_walk = 'enemy_walk',
}

export default class EnemyFighter extends Entity {
  private walkDirection: number = 2
  private changeDirectionTimer: number = 0

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, 'enemy_fighter', x, y)
  }

  create() {
    this.sprite?.setRectangle(24, 64).setFixedRotation().setFriction(0)
    this.createAnims()
  }

  update(dt: number) {
    this.stateMachine?.update(dt)
    this.sprite?.setDisplayOrigin(60, 96)
  }

  setStates(): void {
    this.stateMachine
      ?.addState(enemyStates.enemy_idle, {
        onEnter: this.idleOnEnter,
        onUpdate: this.idleOnUpdate,
      })
      .addState(enemyStates.enemy_walk, {
        onEnter: this.walkOnEnter,
        onUpdate: this.walkOnUpdate,
      })
      .setState(enemyStates.enemy_walk)
  }

  idleOnEnter() {
    this.sprite?.setVelocityX(0)
    this.sprite?.play('enemy_idle_2')
    this.walkDirection = Phaser.Math.Between(-1, 1)
    this.sprite?.setFlipX(this.walkDirection < 0)
    this.changeDirectionTimer = 0
  }
  idleOnUpdate(dt: number) {
    this.changeDirectionTimer += dt

    if (this.changeDirectionTimer >= 2000) {
      this.stateMachine?.setState(enemyStates.enemy_walk)
    }
  }

  walkOnEnter() {
    this.sprite?.play('enemy_walk')
    this.changeDirectionTimer = 0
  }
  walkOnUpdate(dt: number) {
    this.changeDirectionTimer += dt
    this.sprite?.setVelocityX(this.walkDirection)

    if (this.changeDirectionTimer >= 2000) {
      this.stateMachine?.setState(enemyStates.enemy_idle)
    }
  }

  createAnims() {
    this.sprite?.anims.create({
      key: 'enemy_idle_2',
      frames: this.sprite?.anims.generateFrameNames('enemy_fighter', {
        start: 0,
        end: 12,
        prefix: 'idle_2_',
        suffix: '.png',
      }),
      repeat: -1,
      frameRate: 10,
    })

    this.sprite?.anims.create({
      key: 'enemy_walk',
      frames: this.sprite?.anims.generateFrameNames('enemy_fighter', {
        start: 0,
        end: 9,
        prefix: 'walk_',
        suffix: '.png',
      }),
      repeat: -1,
      frameRate: 10,
    })
  }
}
