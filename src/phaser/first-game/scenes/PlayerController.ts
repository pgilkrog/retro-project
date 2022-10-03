import StateMachine from '@/phaser/utils/StateMachine'
import Phaser from 'phaser'

type CursorKeys = Phaser.Types.Input.Keyboard.CursorKeys

export default class PlayerController 
{
    private sprite: Phaser.Physics.Arcade.Sprite
    private cursors: CursorKeys
    private stateMachine: StateMachine

    constructor(sprite: Phaser.Physics.Arcade.Sprite, cursors: CursorKeys) {
        this.sprite = sprite
        this.cursors = cursors

        this.createAnimations()

        this.stateMachine = new StateMachine(this, 'player')

        this.stateMachine.addState('idle', {
                onEnter: this.idleOnEnter,
                onUpdate: this.idleOnUpdate
            })
            .addState('walk', {
              onEnter: this.walkOnEnter,
              onUpdate: this.walkOnUpdate
            })
            .addState('jump', {
                onEnter: this.jumpOnEnter
            })
            .setState('idle')
    }

    update(dt: number) {
        this.stateMachine.update(dt)
    }

    private idleOnEnter() {
        this.sprite.play('character-idle')
    }

    private idleOnUpdate() {
        if (this.cursors.left.isDown || this.cursors.right.isDown)
            this.stateMachine.setState('walk')
    }

    private walkOnEnter() {
        this.sprite.play('character-walk')
    }
    
    private walkOnUpdate() {
        const speed = 100
        this.sprite.setVelocityX(0)

        if (this.cursors.left?.isDown) {
          this.sprite.setVelocityX(-speed)
          this.sprite.flipX = true
        } else if (this.cursors.right.isDown) {
          this.sprite.setVelocityX(speed)
          this.sprite.flipX = false
        } else {
          this.stateMachine.setState('idle')
        }

        const spaceJustPressed = Phaser.Input.Keyboard.JustDown(this.cursors.space)

        if (spaceJustPressed) {
            this.stateMachine.setState('jump')
        }
    }

    private jumpOnEnter() {
        this.sprite.setVelocityY(-280)
    }

    private createAnimations() {
        this.sprite.anims.create({
            key: 'character-idle',
            frames: [{ key: 'character', frame: 'knight/stand_up_5.png' }]
          })
      
          this.sprite.anims.create({
            key: 'character-walk',
            frames: this.sprite.anims.generateFrameNames('character', { start: 1, end: 6, prefix: 'knight/walk_', suffix: '.png' }),
            repeat: -1,
            frameRate: 10
          })
      
          this.sprite.anims.create({
            key: 'character-run',
            frames: this.sprite.anims.generateFrameNames('character', { start: 1, end: 6, prefix: 'knight/run_', suffix: '.png' }),
            repeat: -1,
            frameRate: 10,
          })
    }
}