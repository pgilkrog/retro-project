import StateMachine from '@/phaser/utils/StateMachine'
import { PlayerAnimations } from './PlayerAnimations'
import Entity from '../Entity'
import BulletController from '../../objects/BulletController'
import { sharedInstance as events } from '../../EventCenter'

enum playerStates {
  idle = 'idle',
  walk = 'walk',
  run = 'run',
  jump = 'jump',
  shoot = 'shoot',
  recharge = 'recharge',
  falling = 'falling',
}

enum playerAnims {
  idle = 'player_idle',
  walk = 'player_walk',
  run = 'player_run',
  jump = 'player_jump',
  shoot = 'player_shoot',
  falling = 'player_falling',
  recharge = 'player_recharge',
}

export default class PlayerController extends Entity {
  inAir: boolean = false
  private fallingDelayTimer: Phaser.Time.TimerEvent | undefined
  private bulletController: BulletController | undefined
  private canShoot: boolean = true

  private bulletAmount: number = 50

  private keyInputs: {
    [key: string]: Phaser.Input.Keyboard.Key
  } = {}

  constructor(scene: Phaser.Scene, spawnX: number, spawnY: number) {
    super(scene, 'player', spawnX, spawnY)

    this.bulletController = new BulletController(scene)
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

      if (
        gameObject instanceof Phaser.Physics.Matter.TileBody ||
        gameObject2 instanceof Phaser.Physics.Matter.TileBody
      ) {
        if (
          (this.stateMachine?.isCurrentState(playerStates.jump) ||
            this.stateMachine?.isCurrentState(playerStates.falling)) &&
          data.collision.normal.y >= 1
        ) {
          this.stateMachine.setState(playerStates.idle)
          this.sprite?.setVelocity(0, 0)
          this.inAir = false
        }
      }
    })
  }

  update(dt: number) {
    this.stateMachine?.update(dt)
    this.sprite?.setDisplayOrigin(60, 96)

    const velocityY = this.sprite?.body?.velocity.y
    const threshold = 1e-10

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
      .addState(playerStates.recharge, {
        onEnter: this.rechargeOnEnter,
        onUpdate: this.rechargeOnUpdate,
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

    if (this.keyInputs['keyR'].isDown) {
      this.stateMachine?.setState(playerStates.recharge)
    }
  }

  walkOnEnter() {
    this.sprite?.play(playerAnims.walk)
  }
  walkOnUpdate() {
    if (this.sprite != undefined) {
      if (this.keyInputs['keyD'].isDown || this.keyInputs['keyA'].isDown) {
        this.moveLeftAndRight()
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
    this.moveLeftAndRight()
  }

  shootOnEnter() {
    this.sprite?.play(playerAnims.shoot)
  }
  shootOnUpdate() {
    this.moveLeftAndRight()

    if (this.scene?.input.activePointer.isDown === false) {
      this.stateMachine?.setState(playerStates.idle)
    } else {
      if (this.bulletController != undefined) {
        if (this.canShoot === true && this.bulletAmount > 0) {
          const isFlipped = this.sprite?.flipX === true

          let bullet = this.bulletController.getBullet(
            isFlipped ? this.sprite?.x! - 30 : this.sprite?.x! + 50,
            this.sprite?.y! - 8
          )
          if (bullet != undefined) {
            bullet.fire(
              isFlipped ? this.sprite?.x! - 30 : this.sprite?.x! + 25,
              this.sprite?.y! - 8,
              isFlipped ? -100 : 100,
              0
            ) // Adjust velocity as needed
          }
          this.bulletAmount -= 1
          this.canShoot = false
          events.emit('bullets-changed', this.bulletAmount)

          // Set a timer to reset canShoot after a delay
          this.scene?.time.addEvent({
            delay: 200, // delay in milliseconds
            callback: () => {
              this.canShoot = true
            },
            callbackScope: this,
          })
        }
      }
    }
  }

  fallingOnEnter() {
    this.inAir = true
    this.sprite?.play(playerAnims.falling)
  }
  fallingOnUpdate() {
    this.moveLeftAndRight()

    if (this.sprite?.body?.velocity.y! <= 0 && this.inAir === true) {
      this.stateMachine?.setState(playerStates.idle)
      this.inAir = false
    }
  }

  rechargeOnEnter() {
    this.sprite?.play(playerAnims.recharge)
  }
  rechargeOnUpdate() {
    // Set a timer to reset canShoot after a delay
    this.scene?.time.addEvent({
      delay: 1800, // delay in milliseconds
      callback: () => {
        this.stateMachine?.setState(playerStates.idle)
        events.emit('bullets-changed', 50)
      },
      callbackScope: this,
    })
    this.bulletAmount = 50
  }

  moveLeftAndRight() {
    if (this.sprite != undefined) {
      if (this.keyInputs['keyD'].isDown) {
        this.sprite?.setVelocityX(this.speed)
        this.sprite.flipX = false
      } else if (this.keyInputs['keyA'].isDown) {
        this.sprite?.setVelocityX(-this.speed)
        this.sprite.flipX = true
      } else if (
        this.stateMachine?.isCurrentState(playerStates.falling) === false ||
        this.stateMachine?.isCurrentState(playerStates.jump) === false
      ) {
        this.sprite?.setVelocityX(0)
      }
    }
  }

  private createKeyInputs(scene: Phaser.Scene) {
    this.keyInputs['keyA'] = scene.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.A)
    this.keyInputs['keyD'] = scene.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.D)
    this.keyInputs['space'] = scene.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
    this.keyInputs['keyR'] = scene.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.R)

    // this.keyInputs['keyW'] = scene.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.W)
    // this.keyInputs['keyS'] = scene.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.S)
    // this.keyInputs['keyE'] = scene.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.E)
  }
}
