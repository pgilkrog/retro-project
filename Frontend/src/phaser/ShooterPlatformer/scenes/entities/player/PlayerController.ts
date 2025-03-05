import StateMachine from '@/phaser/utils/StateMachine'
import { PlayerAnimations } from './PlayerAnimations'

type MatterSprite = Phaser.Physics.Matter.Sprite

enum playerStates {
  idle = 'idle',
  walk = 'walk',
  run = 'run',
  jump = 'jump',
  shoot = 'shoot',
}

enum playerAnims {
  idle = 'player_idle',
  walk = 'player_walk',
  run = 'player_run',
  jump = 'player_jump',
  shoot = 'player_shoot',
}

export default class PlayerController {
  sprite: MatterSprite | undefined
  scene: Phaser.Scene | undefined
  stateMachine: StateMachine | undefined
  speed: number = 10
  inAir: boolean = false

  private keyInputs: {
    [key: string]: Phaser.Input.Keyboard.Key
  } = {}

  constructor(scene: Phaser.Scene) {
    this.scene = scene
    this.stateMachine = new StateMachine(this, 'player')
    this.sprite = this.scene?.matter.add.sprite(100, 100, 'player', 'idle_0.png')
    this.createKeyInputs(scene)
    this.create()

    scene.cameras.main.startFollow(this.sprite)
    scene.cameras.main.setZoom(1.5)
  }

  create() {
    if (this.sprite != undefined) {
      this.sprite.setRectangle(32, 64).setFixedRotation().setFriction(0)
      PlayerAnimations(this.sprite)
    }

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
      .setState(playerStates.idle)

    this.sprite?.setOnCollide((data: MatterJS.ICollisionPair) => {
      const body = data.bodyA as MatterJS.BodyType
      const gameObject = body.gameObject
      const body2 = data.bodyB as MatterJS.BodyType
      const gameObject2 = body2.gameObject

      if (
        gameObject instanceof Phaser.Physics.Matter.TileBody ||
        gameObject2 instanceof Phaser.Physics.Matter.TileBody
      ) {
        if (this.stateMachine?.isCurrentState(playerStates.jump) && data.collision.normal.y >= 1) {
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
    this.sprite?.setDisplayOrigin(64, 96)
  }

  idleOnEnter() {
    this.sprite?.play(playerAnims.idle)
  }
  idleOnUpdate() {
    console.log('idle on update')
    if (this.keyInputs['keyD'].isDown || this.keyInputs['keyA'].isDown) {
      this.stateMachine?.setState(playerStates.walk)
    }

    if (this.keyInputs['space'].isDown && this.inAir === false) {
      this.stateMachine?.setState(playerStates.jump)
    }

    if (this.scene?.input.activePointer.isDown) {
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

      // on mouse click enter shoot state

      if (this.keyInputs['space'].isDown && this.inAir === false) {
        this.stateMachine?.setState(playerStates.jump)
      }
    }
  }

  jumpOnEnter() {
    this.sprite?.play(playerAnims.jump)
    this.sprite?.setVelocityY(-8)
    this.inAir = true
  }
  jumpOnUpdate() {
    if (this.sprite != undefined) {
      if (this.keyInputs['keyD'].isDown) {
        this.sprite?.setVelocityX(this.speed - 5)
        this.sprite.flipX = false
      } else if (this.keyInputs['keyA'].isDown) {
        this.sprite?.setVelocityX(-(this.speed - 5))
        this.sprite.flipX = true
      }
    }
  }

  shootOnEnter() {
    this.sprite?.play(playerAnims.shoot)
  }
  shootOnUpdate() {
    console.log('shoot on update')
    if (this.scene?.input.activePointer.isDown === false) {
      this.stateMachine?.setState(playerStates.idle)
    }
  }

  private createKeyInputs(scene: Phaser.Scene) {
    this.keyInputs['keyA'] = scene.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.A)
    this.keyInputs['keyD'] = scene.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.D)
    this.keyInputs['space'] = scene.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)

    this.keyInputs['keyW'] = scene.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.W)
    this.keyInputs['keyS'] = scene.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.S)
    this.keyInputs['keyE'] = scene.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.E)
  }
}
