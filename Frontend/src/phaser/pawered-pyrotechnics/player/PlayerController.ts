import StateMachine from '@/phaser/utils/StateMachine'
import type { Socket } from 'socket.io-client'

enum playerStates {
  idle = 'player_idle',
  walk = 'player_walk',
  lay_bomb = 'player_bomb',
  recharge = 'player_recharge',
}

export default class PlayerController {
  private scene: Phaser.Scene | undefined
  private stateMachine: StateMachine | undefined
  public sprite: Phaser.Physics.Arcade.Sprite | undefined

  private id: string | undefined = ''
  private health: number = 100
  private speed: number = 200
  private canLayBomb: boolean = true
  private socket: Socket | undefined

  private keyInputs: {
    [key: string]: Phaser.Input.Keyboard.Key
  } = {}

  constructor(scene: Phaser.Scene, spawnX: number, spawnY: number, socket: Socket) {
    this.scene = scene
    this.id = socket.id
    this.stateMachine = new StateMachine(this, 'player')
    this.sprite = scene.physics.add
      .sprite(spawnX, spawnY, 'cat1')
      .setSize(540, 740)
      .setScale(0.07)
      .setOffset(250, 200)
    this.socket = socket
    this.createKeyInputs(scene)
    this.setStates()
    this.create()
  }

  create() {
    this.stateMachine?.setState(playerStates.idle)
  }

  update(dt: number) {
    this.stateMachine?.update(dt)
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
      .addState(playerStates.lay_bomb, {
        onEnter: this.layBombOnEnter,
        onUpdate: this.layBombOnUpdate,
      })
      .addState(playerStates.recharge, {
        onEnter: this.rechargeOnEnter,
        onUpdate: this.rechargeOnUpdate,
      })
      .setState(playerStates.idle)
  }

  idleOnEnter() {}
  idleOnUpdate() {
    if (
      this.keyInputs['keyRight'].isDown ||
      this.keyInputs['keyLeft'].isDown ||
      this.keyInputs['keyUp'].isDown ||
      this.keyInputs['keyDown'].isDown
    ) {
      this.stateMachine?.setState(playerStates.walk)
    }
  }

  walkOnEnter() {}
  walkOnUpdate() {
    console.log('PlayerController: walkOnUpdate')
    if (this.sprite != undefined) {
      if (this.keyInputs['keyLeft'].isDown || this.keyInputs['keyRight'].isDown) {
        const direction = this.keyInputs['keyRight'].isDown ? 1 : -1
        this.sprite.setVelocityX(this.speed * direction)
      } else {
        this.sprite.setVelocityX(0)
      }

      if (this.keyInputs['keyUp'].isDown || this.keyInputs['keyDown'].isDown) {
        const direction = this.keyInputs['keyUp'].isDown ? -1 : 1
        this.sprite.setVelocityY(this.speed * direction)
      } else {
        this.sprite.setVelocityY(0)
      }

      if (
        !this.keyInputs['keyUp'].isDown &&
        !this.keyInputs['keyDown'].isDown &&
        !this.keyInputs['keyLeft'].isDown &&
        !this.keyInputs['keyRight'].isDown
      ) {
        this.sprite.setVelocityX(0)
        this.sprite.setVelocityY(0)
        this.stateMachine?.setState(playerStates.idle)
      }
    }
    this.socket?.emit('move', { x: this.sprite?.x, y: this.sprite?.y })
  }

  layBombOnEnter() {}
  layBombOnUpdate() {}

  rechargeOnEnter() {}
  rechargeOnUpdate() {}

  handleButtonPressed(key: string) {}

  private createKeyInputs(scene: Phaser.Scene) {
    this.keyInputs['keyLeft'] = scene.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
    this.keyInputs['keyRight'] = scene.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
    this.keyInputs['keyUp'] = scene.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.UP)
    this.keyInputs['keyDown'] = scene.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN)
    this.keyInputs['keySpace'] = scene.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
  }
}
