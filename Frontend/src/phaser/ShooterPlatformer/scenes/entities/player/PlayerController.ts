import StateMachine from '@/phaser/utils/StateMachine'
import { PlayerAnimations } from './PlayerAnimations'
import Entity from '../Entity'

enum playerStates {
  idle = 'idle',
  walk = 'walk',
  run = 'run',
  jump = 'jump',
  shoot = 'shoot',
  falling = 'falling',
}

enum playerAnims {
  idle = 'player_idle',
  walk = 'player_walk',
  run = 'player_run',
  jump = 'player_jump',
  shoot = 'player_shoot',
  falling = 'player_falling',
}

export default class PlayerController extends Entity {
  inAir: boolean = false
  private fallingDelayTimer: Phaser.Time.TimerEvent | undefined

  private keyInputs: {
    [key: string]: Phaser.Input.Keyboard.Key
  } = {}

  constructor(scene: Phaser.Scene, spawnX: number, spawnY: number) {
    super(scene, 'player', spawnX, spawnY)

    this.createKeyInputs(scene)

    scene.cameras.main.startFollow(this.sprite!)
    scene.cameras.main.setZoom(1.5)
  }

  create() {
    if (this.sprite != undefined) {
      this.sprite.setRectangle(24, 64).setFixedRotation().setFriction(0)
      PlayerAnimations(this.sprite)
    }

    this.sprite?.setOnCollide((data: MatterJS.ICollisionPair) => {
      const body = data.bodyA as MatterJS.BodyType
      const gameObject = body.gameObject
      const body2 = data.bodyB as MatterJS.BodyType
      const gameObject2 = body2.gameObject

      console.log(data)
      if (
        gameObject instanceof Phaser.Physics.Matter.TileBody ||
        gameObject2 instanceof Phaser.Physics.Matter.TileBody
      ) {
        console.log(data.collision.normal.y)
        if (
          (this.stateMachine?.isCurrentState(playerStates.jump) ||
            this.stateMachine?.isCurrentState(playerStates.falling)) &&
          data.collision.normal.y >= 1
        ) {
          console.log("Player's feet are touching the ground")
          this.stateMachine.setState(playerStates.idle)
          this.sprite?.setVelocity(0, 0)
          this.inAir = false
        }

        return
      }
    })
  }

  update(dt: number) {
    this.stateMachine?.update(dt)
    this.sprite?.setDisplayOrigin(60, 96)

    const velocityY = this.sprite?.body?.velocity.y
    const threshold = 1e-10
    console.log(velocityY)
    if (velocityY != undefined) {
      if (
        Math.abs(velocityY) > threshold &&
        velocityY > 0 &&
        this.inAir === false &&
        this.fallingDelayTimer === undefined
      ) {
        this.fallingDelayTimer = this.scene?.time.addEvent({
          delay: 200, // delay in milliseconds
          callback: () => {
            if (velocityY > 0) {
              this.stateMachine?.setState(playerStates.falling)
            }
            this.fallingDelayTimer = undefined
          },
          callbackScope: this,
        })
      }
    }
  }

  setStates() {
    this.stateMachine
      ?.addState(playerStates.idle, {
        onEnter: this.idleOnEnter,
        onUpdate: this.idleOnUpdate,
      })
      .addState(playerStates.walk, {
        onEnter: this.walkOnEnter,
        onUpdate: this.walkOnUpdate,
      })
      .addState(playerStates.jump, {
        onEnter: this.jumpOnEnter,
        onUpdate: this.jumpOnUpdate,
      })
      .addState(playerStates.shoot, {
        onEnter: this.shootOnEnter,
        onUpdate: this.shootOnUpdate,
      })
      .addState(playerStates.falling, {
        onEnter: this.fallingOnEnter,
        onUpdate: this.fallingOnUpdate,
      })
      .setState(playerStates.idle)
  }

  idleOnEnter() {
    this.sprite?.play(playerAnims.idle)
  }
  idleOnUpdate() {
    if (this.keyInputs['keyD'].isDown || this.keyInputs['keyA'].isDown) {
      this.stateMachine?.setState(playerStates.walk)
    }

    if (this.keyInputs['space'].isDown && this.inAir === false) {
      this.stateMachine?.setState(playerStates.jump)
    }

    if (this.scene?.input.activePointer.leftButtonDown()) {
      this.stateMachine?.setState(playerStates.shoot)
    }
  }

  walkOnEnter() {
    this.sprite?.play(playerAnims.walk)
  }
  walkOnUpdate() {
    if (this.sprite != undefined) {
      this.sprite.setVelocity(0)

      if (this.keyInputs['keyD'].isDown) {
        this.sprite?.setVelocityX(this.speed)
        this.sprite.flipX = false
      } else if (this.keyInputs['keyA'].isDown) {
        this.sprite?.setVelocityX(-this.speed)
        this.sprite.flipX = true
      } else {
        this.sprite?.setVelocityX(0)
        this.stateMachine?.setState(playerStates.idle)
      }

      if (this.keyInputs['space'].isDown && this.inAir === false) {
        this.stateMachine?.setState(playerStates.jump)
      }
    }
  }

  jumpOnEnter() {
    this.sprite?.play(playerAnims.jump)
    this.sprite?.setVelocityY(-10)
    this.inAir = true
  }
  jumpOnUpdate() {
    if (this.sprite != undefined) {
      if (this.keyInputs['keyD'].isDown) {
        this.sprite?.setVelocityX(this.speed)
        this.sprite.flipX = false
      } else if (this.keyInputs['keyA'].isDown) {
        this.sprite?.setVelocityX(-this.speed)
        this.sprite.flipX = true
      }
    }
  }

  shootOnEnter() {
    this.sprite?.play(playerAnims.shoot)
  }
  shootOnUpdate() {
    if (this.scene?.input.activePointer.isDown === false) {
      this.stateMachine?.setState(playerStates.idle)
    }
  }

  fallingOnEnter() {
    this.inAir = true
    this.sprite?.play(playerAnims.falling)
  }
  fallingOnUpdate() {
    if (this.sprite?.body?.velocity.y! <= 0 && this.inAir === true) {
      this.stateMachine?.setState(playerStates.idle)
      this.inAir = false
    }
  }

  private createKeyInputs(scene: Phaser.Scene) {
    this.keyInputs['keyA'] = scene.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.A)
    this.keyInputs['keyD'] = scene.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.D)
    this.keyInputs['space'] = scene.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)

    // this.keyInputs['keyW'] = scene.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.W)
    // this.keyInputs['keyS'] = scene.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.S)
    // this.keyInputs['keyE'] = scene.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.E)
  }
}
