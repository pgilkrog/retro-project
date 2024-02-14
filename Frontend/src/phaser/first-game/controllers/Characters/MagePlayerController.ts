import StateMachine from '@/phaser/utils/StateMachine'
import Phaser from 'phaser'
import { sharedInstance as events } from '@/phaser/first-game/scenes/EventCenter'
import type ObstaclesController from '../ObstaclesController'

type CursorKeys = Phaser.Types.Input.Keyboard.CursorKeys
type MatterSprite = Phaser.Physics.Matter.Sprite

enum states {
  idle = 'idle',
  walk = 'walk',
  jump = 'jump',
  spikeHit = 'spike-hit',
  skeletonHit = 'skeleton-hit',
  skeletonStomp = 'skeleton-stomp',
  death = 'death',
  attack = 'attack'
}

enum animations {
  characterIdle = 'character-idle',
  characterWalk = 'character-walk',
  characterDeath = 'character-death',
  characterAttack1 = 'character-attack-1',
  characterRoll = 'character-roll'
}

export default class MagePlayerController {
  private sprite: MatterSprite
  private cursors: CursorKeys
  private stateMachine: StateMachine
  private obstaclesController: ObstaclesController
  private scene: Phaser.Scene
  private health = 100
  private mana = 100
  private ctrl: any
  private jumpCount = 0
  private missiles?: MatterSprite
  private speed = 3

  private lastSkeleton?: MatterSprite

  constructor(scene: Phaser.Scene, sprite: MatterSprite, cursors: CursorKeys, obstaclesController: ObstaclesController) {
    this.sprite = sprite
    this.cursors = cursors
    this.obstaclesController = obstaclesController
    this.scene = scene

    this.sprite.setRectangle(16, 32)
    this.sprite.setDisplayOrigin(16, 24)
    this.sprite.setFixedRotation()
    this.sprite.setFriction(0)

    this.createAnimations()

    this.stateMachine = new StateMachine(this, 'player')

    this.stateMachine
      .addState(states.idle, {
        onEnter: this.idleOnEnter,
        onUpdate: this.idleOnUpdate
      })
      .addState(states.walk, {
        onEnter: this.walkOnEnter,
        onUpdate: this.walkOnUpdate
      })
      .addState(states.jump, {
        onEnter: this.jumpOnEnter,
        onUpdate: this.jumpOnUpdate
      })
      .addState(states.spikeHit, {
        onEnter: this.spikeHitOnEnter
      })
      .addState(states.skeletonHit, {
        onEnter: this.skeletonHitOnEnter
      })
      .addState(states.death, {
        onEnter: this.deathOnEnter
      })
      .addState(states.attack, {
        onEnter: this.attackOnEnter
      })
      .setState(states.idle)

    this.sprite.setOnCollide((data: MatterJS.ICollisionPair) => {
      const body = data.bodyB as MatterJS.BodyType
      const gameObject = body.gameObject

      if (this.obstaclesController.is('spikes', body)) {
        this.stateMachine.setState(states.spikeHit)
        return         
      }

      if (this.obstaclesController.is('skeleton', body)) {
        this.lastSkeleton = body.gameObject

        if (this.sprite.y < body.position.y)
          this.stateMachine.setState(states.skeletonStomp)
        else 
          this.stateMachine.setState(states.skeletonHit)

        return
      }

      if (!gameObject)
        return

      if (gameObject instanceof Phaser.Physics.Matter.TileBody) {
        if (this.stateMachine.isCurrentState(states.jump) && data.collision.normal.y < 0) {
          this.stateMachine.setState(states.idle)
          this.jumpCount = 0      
        }

        return
      }

      const sprite = gameObject as MatterSprite
      const type = sprite.getData('type')

      switch (type) {
        case 'heart': {
          events.emit('heart-collected')
          sprite.destroy()
          break
        }

        case 'potion-health': {
          const value = sprite.getData('healthPoints') ?? 10
          this.health = Phaser.Math.Clamp(this.health + value, 0 , 100)
          sprite.destroy()
          events.emit('health-changed', this.health)
          break
        }
      }
    })

    this.ctrl = this.scene.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.CTRL)
  }

  update(dt: number) {
    this.stateMachine.update(dt)
  }

  private setHealth(value: number) {
    this.health = Phaser.Math.Clamp(value, 0, 100)
    events.emit('health-changed', this.health)

    if (this.health <= 0) {
      this.stateMachine.setState(states.death)
    }
  }

  private setMana(value: number) {
    this.mana = Phaser.Math.Clamp(value, 0, 100)
    events.emit('mana-changed', this.mana)
  }

  private idleOnEnter() {
    this.sprite.play(animations.characterIdle)
  }

  private idleOnUpdate() {
    const spaceJustPressed = Phaser.Input.Keyboard.JustDown(this.cursors.space)

    if (this.cursors.left.isDown || this.cursors.right.isDown)
      this.stateMachine.setState(states.walk)
    else if (spaceJustPressed)
      this.stateMachine.setState(states.jump)   
    else if (this.ctrl.isDown && this.mana >= 5)
      this.stateMachine.setState(states.attack)
    else
      this.sprite.setVelocityX(0)
  }

  private walkOnEnter() {
    this.sprite.play(animations.characterWalk)
  }

  private walkOnUpdate() {

    if (this.cursors.left.isDown) {
      this.sprite.setVelocityX(-this.speed)
      this.sprite.flipX = true
    } else if (this.cursors.right.isDown) {
      this.sprite.setVelocityX(this.speed)
      this.sprite.flipX = false
    } else {
      this.sprite.setVelocityX(0)
      this.stateMachine.setState(states.idle)
    }

    const spaceJustPressed = Phaser.Input.Keyboard.JustDown(this.cursors.space)

    if (spaceJustPressed) {
      this.stateMachine.setState(states.jump)
    }
  }

  private jumpOnEnter() {
    this.sprite.play(animations.characterRoll)
    this.jumpCount++
    this.sprite.setVelocityY(-6)
  }

  private jumpOnUpdate() {
    if (this.cursors.left.isDown) {
      this.sprite.setVelocityX(-this.speed)
      this.sprite.flipX = true
    } else if (this.cursors.right.isDown) {
      this.sprite.setVelocityX(this.speed)
      this.sprite.flipX = false
    } 

    const spaceJustPressed = Phaser.Input.Keyboard.JustDown(this.cursors.space)

    if (spaceJustPressed && this.jumpCount < 2) {
      this.stateMachine.setState(states.jump)
    }
  }

  private spikeHitOnEnter() {
    this.sprite.setVelocityY(-5)

    this.changeColor()

    this.stateMachine.setState(states.idle)
    this.setHealth(this.health - 10)
  }

  private skeletonHitOnEnter() {
    if (this.lastSkeleton) {
      if (this.sprite.x < this.lastSkeleton.x) {
        this.sprite.setVelocityX(-5)
      }
      else {
        this.sprite.setVelocityX(5)
      }
    }
    else
      this.sprite.setVelocityY(10)

    this.setHealth(this.health - 25)
    this.sprite.setVelocityY(-5)

    this.changeColor()

    this.stateMachine.setState(states.idle)
  }

  private deathOnEnter() {
    this.sprite.play(animations.characterDeath)

    this.sprite.setOnCollide(() => {
      //empty
    })

    this.scene.time.delayedCall(1500, () => {
      this.scene.scene.start('game-over')      
    })
  }

  private attackOnEnter() {
    this.sprite.play(animations.characterAttack1)
    this.setMana(this.mana - 5)   
    this.scene.time.delayedCall(400, () => {
      this.shootMagic()   
      this.stateMachine.setState(states.idle)
    })       
  }

  setMagicMissile(missiles: Phaser.Physics.Matter.Sprite) {
    this.missiles = missiles;
  }

  private shootMagic() {
    if(this.sprite.flipX === false) {
      this.missiles?.setPosition(this.sprite.body!.position.x + 20, this.sprite.body!.position.y - 10)
      this.missiles?.setVelocity(5, 0)
    } else {
      this.missiles?.setPosition(this.sprite.body!.position.x - 20, this.sprite.body!.position.y - 10)
      this.missiles?.setVelocity(-5, 0)
    }
  }
  
  private createAnimations() {
    this.sprite.anims.create({
      key: animations.characterIdle,
      frames: this.sprite.anims.generateFrameNames('mage-character', { start: 1, end: 12, prefix: 'Cut/mage-idle-', suffix: '.png' }),
      repeat: -1,
      frameRate: 10
    })

    this.sprite.anims.create({
      key: animations.characterWalk,
      frames: this.sprite.anims.generateFrameNames('mage-character', { start: 1, end: 4, prefix: 'Cut/mage-walk-', suffix: '.png' }),
      repeat: -1,
      frameRate: 10
    })

    this.sprite.anims.create({
      key: animations.characterDeath,
      frames: this.sprite.anims.generateFrameNames('mage-character', { start: 1, end: 7, prefix: 'Cut/mage-death-', suffix: '.png' }),
      repeat: 0,
      frameRate: 10
    })
    
    this.sprite.anims.create({
      key: animations.characterAttack1,
      frames: this.sprite.anims.generateFrameNames('mage-character', { start: 1, end: 3, prefix: 'Cut/mage-attack1-', suffix: '.png' }),
      repeat: 0,
      frameRate: 6,
    })

    this.sprite.anims.create({
      key: animations.characterRoll,
      frames: this.sprite.anims.generateFrameNames('mage-character', { start: 1, end: 5, prefix: 'Cut/mage-roll-', suffix: '.png'}),
      repeat: -1,
      frameRate: 15
    })
  }

  private changeColor () {
    const startColor = Phaser.Display.Color.ValueToColor(0xffffff)
    const endColor = Phaser.Display.Color.ValueToColor(0xff0000)
    
    this.scene.tweens.addCounter({
      from: 0,
      to: 100,
      duration: 100,
      repeat: 2,
      yoyo: true,
      ease: Phaser.Math.Easing.Sine.InOut,
      onUpdate: tween => {
        const value = tween.getValue()
        const colorObject = Phaser.Display.Color.Interpolate.ColorWithColor(
          startColor,
          endColor,
          100,
          value
        )

        const color = Phaser.Display.Color.GetColor(
          colorObject.r,
          colorObject.g,
          colorObject.b
        )

        this.sprite.setTint(color)
      }
    })
  }
}