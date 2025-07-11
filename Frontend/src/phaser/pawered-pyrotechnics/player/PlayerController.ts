import StateMachine from '@/phaser/utils/StateMachine'
import type { Socket } from 'socket.io-client'
import { CardTypes } from '../models/ICard'

enum playerStates {
  idle = 'player_idle',
  walk = 'player_walk',
  lay_bomb = 'player_bomb',
  recharge = 'player_recharge',
  dead = 'player_dead',
}

export default class PlayerController {
  private scene: Phaser.Scene | undefined
  private stateMachine: StateMachine | undefined
  public sprite: Phaser.Physics.Arcade.Sprite | undefined

  private id: string | undefined = ''
  private speed: number = 200
  private canLayBomb: boolean = true
  private bombDelayRecharge: number = 600 // milliseconds
  private socket: Socket | undefined
  public playerNumber: number = 0

  public bombAmount: number = 1
  public bombRange: number = 1

  private keyInputs: {
    [key: string]: Phaser.Input.Keyboard.Key
  } = {}

  constructor(
    scene: Phaser.Scene, 
    spawnX: number, 
    spawnY: number, 
    socket: Socket
  ) {
    this.scene = scene
    this.id = socket.id
    this.stateMachine = new StateMachine(this, 'player')
    this.sprite = scene.physics.add
      .sprite(spawnX, spawnY, 'cat1')
      .setSize(40, 54)
      .setScale(1)
      .setOffset(15, 6)
      .setDepth(1)
    this.socket = socket
    this.createKeyInputs(scene)
    this.setStates()
    this.create()
  }

  create() {
    this.stateMachine?.setState(playerStates.idle)
  }

  public gotCard = (card: CardTypes) => {
    switch (card) {
      case CardTypes.ADD_BOMB:
        this.bombAmount += 1
        break
      case CardTypes.LONGER_EXPLOSION:
        this.bombRange += 1
        break
      default:
        console.log('Unknown card type:', card)
    }
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
      .addState(playerStates.dead, {
        onEnter: this.deadOnEnter,
        onUpdate: this.deadOnUpdate,
      })
      .setState(playerStates.idle)
  }

  idleOnEnter() {}
  idleOnUpdate() {
    if (
      this.keyInputs['keyRight'].isDown === true ||
      this.keyInputs['keyLeft'].isDown === true ||
      this.keyInputs['keyUp'].isDown === true ||
      this.keyInputs['keyDown'].isDown === true
    ) {
      this.stateMachine?.setState(playerStates.walk)
    }

    if (this.keyInputs['keySpace'].isDown === true && this.canLayBomb === true) {
      this.stateMachine?.setState(playerStates.lay_bomb)
    }
  }

  walkOnEnter() {}
  walkOnUpdate() {
    if (this.sprite != undefined) {
      if (this.keyInputs['keyLeft'].isDown === true || this.keyInputs['keyRight'].isDown === true) {
        const direction = this.keyInputs['keyRight'].isDown ? 1 : -1
        this.sprite.setVelocityX(this.speed * direction)
      } else {
        this.sprite.setVelocityX(0)
      }

      if (this.keyInputs['keyUp'].isDown === true || this.keyInputs['keyDown'].isDown === true) {
        const direction = this.keyInputs['keyUp'].isDown ? -1 : 1
        this.sprite.setVelocityY(this.speed * direction)
      } else {
        this.sprite.setVelocityY(0)
      }

      if (
        this.keyInputs['keyUp'].isDown === false &&
        this.keyInputs['keyDown'].isDown === false &&
        this.keyInputs['keyLeft'].isDown === false &&
        this.keyInputs['keyRight'].isDown === false
      ) {
        this.sprite.setVelocityX(0)
        this.sprite.setVelocityY(0)
        this.stateMachine?.setState(playerStates.idle)
      }

      if (this.keyInputs['keySpace'].isDown === true && this.canLayBomb === true) {
        this.stateMachine?.setState(playerStates.lay_bomb)
      }
    }

    this.socket?.emit('move', { x: this.sprite?.x, y: this.sprite?.y })
  }

  layBombOnEnter() {}
  layBombOnUpdate() {
    if (this.canLayBomb === true) {
      this.canLayBomb = false
      this.socket?.emit('placeBomb', { x: this.sprite?.x, y: this.sprite?.y, width: this.bombRange })
      this.stateMachine?.setState(playerStates.idle)

      this.scene?.time.addEvent({
        delay: this.bombDelayRecharge,
        callback: () => {
          console.log('Bomb can be laid again')
          this.canLayBomb = true
        },
        callbackScope: this,
      })
    } else {
      console.log('Cannot lay another bomb yet')
    }
  }

  deadOnEnter() {
    this.sprite?.setTexture('bomb')
  }
  deadOnUpdate() {}

  private createKeyInputs(scene: Phaser.Scene) {
    this.keyInputs['keyLeft'] = scene.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
    this.keyInputs['keyRight'] = scene.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
    this.keyInputs['keyUp'] = scene.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.UP)
    this.keyInputs['keyDown'] = scene.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN)
    this.keyInputs['keySpace'] = scene.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
  }

  public setDeathState() {
    this.stateMachine?.setState(playerStates.dead)
  }

  public setPlayerNumber(playerNumber: number) {
    this.playerNumber = playerNumber
  }
}
