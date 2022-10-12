import StateMachine from "@/phaser/utils/StateMachine"
import { sharedInstance as events } from '@/phaser/first-game/scenes/EventCenter'

enum states {
  moveLeft = 'move-left',
  moveRight = 'move-right',
  dead = 'dead',
  idle = 'idle'
}

export default class SkeletonController {
  private sprite: Phaser.Physics.Matter.Sprite
  private stateMachine: StateMachine
  private moveTime = 0
  private scene: Phaser.Scene

  constructor(sprite: Phaser.Physics.Matter.Sprite, scene: Phaser.Scene) {
    this.sprite = sprite
    this.scene = scene
    this.createAnimations()
    this.stateMachine = new StateMachine(this, 'skeleton')

    this.stateMachine.addState(states.idle, {
        onEnter: this.idleOnEnter
      })
      .addState(states.moveLeft, {
        onEnter: this.moveLeftOnEnter,
        onUpdate: this.moveLeftOnUpdate
      })
      .addState(states.moveRight, {
        onEnter: this.moveRightOnEnter,
        onUpdate: this.moveRightOnUpdate
      })
      .addState(states.dead, {
        onEnter: this.deathOnEnter
      })
      .setState(states.idle)
  
      events.on('skeleton-stomped', this.handleStomped, this)
  }

  destroy() {
    events.off('skeleton-stomped', this.handleStomped, this)
  }

  update(dt: number) {
    this.stateMachine.update(dt)
  }

  private idleOnEnter() {
    const rng = Phaser.Math.Between(1, 100)

    if (rng < 50) {
      this.stateMachine.setState(states.moveLeft)      
    }
    else {
      this.stateMachine.setState(states.moveRight)      
    }
  }

  private moveLeftOnEnter() {
    this.moveTime = 0
    this.sprite.play('walk')
    this.sprite.flipX = false
  }

  private moveLeftOnUpdate(dt: number) {
    this.moveTime += dt
    this.sprite.setVelocityX(-1)
    
    if (this.moveTime > 2000)
      this.stateMachine.setState(states.moveRight)
  }
  
  private moveRightOnEnter() {
    this.moveTime = 0
    this.sprite.play('walk')
    this.sprite.flipX = true
  }

  private moveRightOnUpdate(dt: number) {
    this.moveTime += dt
    this.sprite.setVelocityX(1)

    if (this.moveTime > 2000)
      this.stateMachine.setState(states.moveLeft)
  }

  private deathOnEnter() {
    this.scene.time.delayedCall(1500, () => {
         this.sprite.destroy()
    })
  }

  private handleStomped(skeleton: Phaser.Physics.Matter.Sprite) {
    console.log("STUMPED SKELTON YO")
    if (this.sprite !== skeleton)
      return

    events.off('skeleton-stomped', this.handleStomped, this)
    this.sprite.play('death')
    this.stateMachine.setState(states.dead)
  }

  private createAnimations() {
    this.sprite.anims.create({
      key: 'idle',
      frames: [{ key: 'mob-skeleton', frame: 'skeleton-walk-1.png' }],
      repeat: -1,
      frameRate: 10
    })
    
    this.sprite.anims.create({
      key: 'walk',
      frames: this.sprite.anims.generateFrameNames('mob-skeleton', {
        start: 1,
        end: 3,
        prefix: 'skeleton-walk-',
        suffix: '.png'
      }),
      repeat: -1,
      frameRate: 3
    })

    this.sprite.anims.create({
      key: 'death',
      frames: this.sprite.anims.generateFrameNames('mob-skeleton', {
        start: 1,
        end: 3,
        prefix: 'skeleton-death-',
        suffix: '.png'
      }),
      repeat: 0,
      frameRate: 3
    })
  }
}