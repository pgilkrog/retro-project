import { PlayerAnimations } from './PlayerAnimations'
import Entity from '../Entity'
import BulletController from '../../objects/BulletController'
import { CUSTOM_EVENTS, sharedInstance as events } from '../../EventCenter'
import { playerStates, playerAnims } from '../../../interfaces/enums/playerEnums'
import { createKeyInputs, getKeyInputs } from '../../../helpers/keyInputs'
import { collisionCategories } from '../../../helpers/collisionCategories'

export default class PlayerController extends Entity {
  private inAir: boolean = false
  private fallingDelayTimer: Phaser.Time.TimerEvent | undefined
  private bulletController: BulletController
  private canShoot: boolean = true
  private bulletAmount: number = 50

  private keyInputs: {
    [key: string]: Phaser.Input.Keyboard.Key
  } = {}

  constructor(scene: Phaser.Scene, spawnX: number, spawnY: number) {
    super(scene, 'player', spawnX, spawnY)

    this.bulletController = new BulletController(scene)
    this.keyInputs = getKeyInputs()

    // TODO maybe make some cool camera effect when moving, with a bit of a delay
    scene.cameras.main.startFollow(this.sprite)
    scene.cameras.main.setZoom(1.5)
  }

  create() {
    this.sprite.setRectangle(24, 64).setFixedRotation().setFriction(0)

    this.sprite.setOnCollide((data: MatterJS.ICollisionPair) => {
      const body = data.bodyA as MatterJS.BodyType
      const gameObject = body.gameObject
      const body2 = data.bodyB as MatterJS.BodyType
      const gameObject2 = body2.gameObject

      if (
        gameObject instanceof Phaser.Physics.Matter.TileBody ||
        gameObject2 instanceof Phaser.Physics.Matter.TileBody
      ) {
        if (
          (this.stateMachine.isCurrentState(playerStates.player_jump) ||
            this.stateMachine.isCurrentState(playerStates.player_falling)) &&
          data.collision.normal.y >= 1
        ) {
          this.stateMachine.setState(playerStates.player_idle)
          this.sprite.setVelocity(0, 0)
          this.inAir = false
        }
      }
    })

    this.sprite.setCollisionCategory(collisionCategories.player)
    this.sprite.setCollidesWith([1])
  }

  createAnimations() {
    PlayerAnimations(this.sprite)
  }

  update(dt: number) {
    this.stateMachine.update(dt)
    this.sprite.setDisplayOrigin(60, 96)

    const velocityY = this.sprite?.body?.velocity.y
    const threshold = 1e-10

    if (velocityY != undefined) {
      if (
        Math.abs(velocityY) > threshold &&
        velocityY > 0 &&
        this.inAir === false &&
        this.fallingDelayTimer == undefined
      ) {
        this.fallingDelayTimer = this.scene?.time.addEvent({
          delay: 200,
          callback: () => {
            if (velocityY > 0) {
              this.stateMachine?.setState(playerStates.player_falling)
            }
            this.fallingDelayTimer = undefined
          },
          callbackScope: this,
        })
      }
    }
  }

  setStates() {
    super.setStates()
    this.stateMachine
      .addState(playerStates.player_run, {
        onEnter: this.runOnEnter,
        onUpdate: this.runOnUpdate,
      })
      .addState(playerStates.player_jump, {
        onEnter: this.jumpOnEnter,
        onUpdate: this.jumpOnUpdate,
      })
      .addState(playerStates.player_shoot, {
        onEnter: this.shootOnEnter,
        onUpdate: this.shootOnUpdate,
      })
      .addState(playerStates.player_falling, {
        onEnter: this.fallingOnEnter,
        onUpdate: this.fallingOnUpdate,
      })
      .addState(playerStates.player_recharge, {
        onEnter: this.rechargeOnEnter,
        onUpdate: this.rechargeOnUpdate,
      })
      .addState(playerStates.player_melee, {
        onEnter: this.meleeOnEnter,
        onUpdate: this.meleeOnUpdate,
      })
      .setState(playerStates.player_idle)
  }

  idleOnEnter() {
    console.log('entered idle state')
    this.sprite?.play(playerAnims.player_idle)
  }
  idleOnUpdate() {
    if (this.keyInputs['keyD'].isDown || this.keyInputs['keyA'].isDown) {
      this.stateMachine?.setState(playerStates.player_walk)
    }

    if (this.keyInputs['space'].isDown && this.inAir === false) {
      this.stateMachine?.setState(playerStates.player_jump)
    }

    if (this.scene?.input.activePointer.leftButtonDown()) {
      this.stateMachine?.setState(playerStates.player_shoot)
    }

    if (this.scene?.input.activePointer.rightButtonDown()) {
      this.stateMachine?.setState(playerStates.player_melee)
    }

    if (this.keyInputs['keyR'].isDown) {
      this.stateMachine?.setState(playerStates.player_recharge)
    }
  }

  walkOnEnter() {
    this.sprite?.play(playerAnims.player_walk)
  }
  walkOnUpdate() {
    if (this.keyInputs['keyD'].isDown || this.keyInputs['keyA'].isDown) {
      this.moveLeftAndRight(this.speed)
    } else {
      this.sprite?.setVelocityX(0)
      this.stateMachine?.setState(playerStates.player_idle)
    }

    if (this.keyInputs['keyShift'].isDown) {
      this.stateMachine?.setState(playerStates.player_run)
    }

    if (this.keyInputs['space'].isDown && this.inAir === false) {
      this.stateMachine?.setState(playerStates.player_jump)
    }

    if (this.scene?.input.activePointer.leftButtonDown()) {
      this.stateMachine?.setState(playerStates.player_shoot)
    }
  }

  runOnEnter() {
    console.log('entered run state')
    this.sprite.play(playerAnims.player_run)
  }
  runOnUpdate() {
    if (this.keyInputs['keyD'].isDown || this.keyInputs['keyA'].isDown) {
      this.moveLeftAndRight(this.runSpeed)
    } else {
      this.sprite?.setVelocityX(0)
      this.stateMachine?.setState(playerStates.player_idle)
    }

    if (this.keyInputs['space'].isDown && this.inAir === false) {
      this.stateMachine?.setState(playerStates.player_jump)
    }

    if (this.keyInputs['keyShift'].isUp) {
      this.stateMachine?.setState(playerStates.player_walk)
    }
  }

  jumpOnEnter() {
    this.sprite?.play(playerAnims.player_jump)
    this.sprite?.setVelocityY(-10)
    this.inAir = true
  }
  jumpOnUpdate() {
    let speed = this.keyInputs['keyShift'].isDown ? this.runSpeed : this.speed
    this.moveLeftAndRight(speed)
  }

  shootOnEnter() {
    this.sprite?.play(playerAnims.player_shoot)
  }
  shootOnUpdate() {
    this.moveLeftAndRight(this.speed / 1.5)

    if (this.scene?.input.activePointer.isDown === false) {
      this.stateMachine?.setState(playerStates.player_idle)
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
              isFlipped ? -30 : 30,
              0
            )
          }

          this.bulletAmount -= 1
          this.canShoot = false
          events.emit(CUSTOM_EVENTS.BULLETS_CHANGED, this.bulletAmount)

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
    this.sprite?.play(playerAnims.player_falling)
  }
  fallingOnUpdate() {
    this.moveLeftAndRight(this.speed / 1.5)

    if (
      this.sprite.body?.velocity.y != undefined &&
      this.sprite.body?.velocity.y <= 0 &&
      this.inAir === true
    ) {
      this.stateMachine.setState(playerStates.player_idle)
      this.inAir = false
    }
  }

  rechargeOnEnter() {
    this.sprite?.play(playerAnims.player_recharge)
  }
  rechargeOnUpdate() {
    // Set a timer to reset canShoot after a delay
    this.scene?.time.addEvent({
      delay: 1800,
      callback: () => {
        this.stateMachine?.setState(playerStates.player_idle)
        events.emit(CUSTOM_EVENTS.BULLETS_CHANGED, 50)
      },
      callbackScope: this,
    })
    this.bulletAmount = 50
  }

  meleeOnEnter() {
    this.sprite.play(playerAnims.player_melee)
    this.scene.time.addEvent({
      delay: 500,
      callback: () => {
        this.stateMachine.setState(playerStates.player_idle)
        console.log('melee attack finished')
      },
      callbackScope: this,
    })
  }
  meleeOnUpdate() {}

  moveLeftAndRight(speed: number) {
    if (this.keyInputs['keyD'].isDown) {
      this.sprite.setVelocityX(speed)
      this.sprite.flipX = false
    } else if (this.keyInputs['keyA'].isDown) {
      this.sprite.setVelocityX(-speed)
      this.sprite.flipX = true
    } else if (
      this.stateMachine.isCurrentState(playerStates.player_falling) === false ||
      this.stateMachine.isCurrentState(playerStates.player_jump) === false
    ) {
      this.sprite.setVelocityX(0)
    }
  }
}
