import StateMachine from '@/phaser/utils/StateMachine'
import Phaser from 'phaser'
import { sharedInstance as events } from '@/phaser/first-game/scenes/EventCenter'

type CursorKeys = Phaser.Types.Input.Keyboard.CursorKeys

export default class PlayerController {
  private sprite: Phaser.Physics.Matter.Sprite
  private cursors: CursorKeys
  private stateMachine: StateMachine

  constructor(sprite: Phaser.Physics.Matter.Sprite, cursors: CursorKeys) {
    this.sprite = sprite
    this.cursors = cursors

    this.createAnimations()

    this.stateMachine = new StateMachine(this, 'player')

    this.stateMachine
      .addState('idle', {
        onEnter: this.idleOnEnter,
        onUpdate: this.idleOnUpdate
      })
      .addState('walk', {
        onEnter: this.walkOnEnter,
        onUpdate: this.walkOnUpdate
      })
      .addState('jump', {
        onEnter: this.jumpOnEnter,
        onUpdate: this.jumpOnUpdate
      })
      .setState('idle')

    this.sprite.setOnCollide((data: MatterJS.ICollisionPair) => {
      const body = data.bodyB as MatterJS.BodyType
      const gameObject = body.gameObject

      console.log(gameObject)

      if (!gameObject)
        return

      if (gameObject instanceof Phaser.Physics.Matter.TileBody) {
        if (this.stateMachine.isCurrentState('jump'))
          this.stateMachine.setState('idle')

        return
      }

      const sprite = gameObject as Phaser.Physics.Matter.Sprite
      const type = sprite.getData('type')

      switch (type) {
        case 'heart': {
          events.emit('heart-collected')
          sprite.destroy()
          break
        }
      }
    })
  }

  update(dt: number) {
    this.stateMachine.update(dt)
  }

  private idleOnEnter() {
    this.sprite.play('character-idle')
  }

  private idleOnUpdate() {
    const spaceJustPressed = Phaser.Input.Keyboard.JustDown(this.cursors.space)

    if (this.cursors.left.isDown || this.cursors.right.isDown)
      this.stateMachine.setState('walk')
    else if (spaceJustPressed) {
      this.stateMachine.setState('jump')
    }
  }

  private walkOnEnter() {
    this.sprite.play('character-walk')
  }

  private walkOnUpdate() {
    const speed = 3

    if (this.cursors.left.isDown) {
      this.sprite.setVelocityX(-speed)
      this.sprite.flipX = true
    } else if (this.cursors.right.isDown) {
      this.sprite.setVelocityX(speed)
      this.sprite.flipX = false
    } else {
      this.sprite.setVelocityX(0)
      this.stateMachine.setState('idle')
    }

    const spaceJustPressed = Phaser.Input.Keyboard.JustDown(this.cursors.space)

    if (spaceJustPressed) {
      this.stateMachine.setState('jump')
    }
  }

  private jumpOnEnter() {
    this.sprite.setVelocityY(-8)
  }

  private jumpOnUpdate() {
    const speed = 3

    if (this.cursors.left.isDown) {
      this.sprite.setVelocityX(-speed)
      this.sprite.flipX = true
    } else if (this.cursors.right.isDown) {
      this.sprite.setVelocityX(speed)
      this.sprite.flipX = false
    }
  }

  private createAnimations() {
    this.sprite.anims.create({
      key: 'character-idle',
      frames: this.sprite.anims.generateFrameNames('character', { start: 1, end: 12, prefix: 'Cut/mage-idle-', suffix: '.png' }),
      repeat: -1,
      frameRate: 10
    })

    this.sprite.anims.create({
      key: 'character-walk',
      frames: this.sprite.anims.generateFrameNames('character', { start: 1, end: 4, prefix: 'Cut/mage-walk-', suffix: '.png' }),
      repeat: -1,
      frameRate: 10
    })
  }
}