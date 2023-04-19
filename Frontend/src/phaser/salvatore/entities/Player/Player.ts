import Phaser from 'phaser'
import findPath from '../../utils/findPath'
import StateMachine from '@/phaser/utils/StateMachine'
import { createPlayerAnimations } from './PlayerAnimations'

enum playerStates {
  idle = 'idle',
  walk = 'walk',
  death = 'death',
  attack = 'attack',
  combat = 'combat',
  inCar = 'inCar'
}

enum playerAnims {
  idle = 'idle',
  walkLeft = 'walkLeft',
  walkRight = 'walkRight',
  walkUp = 'walkUp',
  walkDown = 'walkDown'
}

export default class Player extends Phaser.Physics.Arcade.Sprite {
  private speed = 200 as number
  private map: any
  private stateMachine?: StateMachine

  private movePath: Phaser.Math.Vector2[] = []
  private moveToTarget?: Phaser.Math.Vector2
  public inCar: boolean = false

  private keyInputs: {
    [key: string]: Phaser.Input.Keyboard.Key;
  } = {}

  constructor(scene: Phaser.Scene, x: number, y: number, map: any) {
    super(scene, x, y, 'player')

    scene.add.existing(this)
    scene.physics.add.existing(this)

    this.map = map

    this.inCar = false

    this.init()
    this.initEvents()
    this.createKeyInputs()
  }

  private init() {
    this.setCollideWorldBounds(true)
    this.body.setSize(20, 10, true)
    this.body.setOffset(6, 38)
    this.setInteractive()

    this.createStateMachine()
    createPlayerAnimations(this.anims, playerAnims)
  }

  update(dt: number) {
    this.stateMachine?.update(dt)
  }

  moveAlong(path: Phaser.Math.Vector2[]) {
    if (!path || path.length <= 0) {
      return
    }

    this.movePath = path
    this.moveTo(this.movePath.shift()!)
  }

  moveTo(target: Phaser.Math.Vector2) {
    this.moveToTarget = target
  }

  initEvents() {
    this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this)
  }

  private createKeyInputs() {
    this.keyInputs['keyW'] = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W)
    this.keyInputs['keyS'] = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S)
    this.keyInputs['keyA'] = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
    this.keyInputs['keyD'] = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
    this.keyInputs['keyE'] = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E)
  }

  private createStateMachine(): void {
    this.stateMachine = new StateMachine(this, 'player')

    this.stateMachine
      .addState(playerStates.idle, {
        onEnter: this.idleOnEnter,
        onUpdate: this.idleOnUpdate
      })
      .addState(playerStates.walk, {
        onEnter: this.walkOnEnter,
        onUpdate: this.walkOnUpdate
      })
      .setState(playerStates.idle)
  }

  private idleOnEnter(): void {
    this.anims.play(playerAnims.walkDown)
  }

  private idleOnUpdate(): void {
    if (
      this.keyInputs['keyD'].isDown || 
      this.keyInputs['keyA'].isDown || 
      this.keyInputs['keyW'].isDown || 
      this.keyInputs['keyS'].isDown
    ) {
      this.stateMachine?.setState(playerStates.walk)
    }
  }

  private walkOnEnter(): void {
    if(this.keyInputs['keyD'].isDown)
      this.anims.play(playerAnims.walkRight)
    else if(this.keyInputs['keyA'].isDown)
      this.anims.play(playerAnims.walkLeft)
    else if(this.keyInputs['keyW'].isDown)
      this.anims.play(playerAnims.walkUp)
    else if(this.keyInputs['keyS'].isDown)
      this.anims.play(playerAnims.walkDown)
  }

  private walkOnUpdate(): void {
    this.setVelocity(0)
    this.setDrag(1000)

    if (this.keyInputs['keyD'].isDown) {
      this.setVelocityX(this.speed)
    } 
    else if (this.keyInputs['keyA'].isDown) {
      this.setVelocityX(-this.speed)
    }
    
    if (this.keyInputs['keyW'].isDown) {
      this.setVelocityY(-this.speed)
    } 
    else if (this.keyInputs['keyS'].isDown) {
      this.setVelocityY(this.speed)
    }

    if (
      this.keyInputs['keyD'].isDown || 
      this.keyInputs['keyA'].isDown || 
      this.keyInputs['keyW'].isDown || 
      this.keyInputs['keyS'].isDown
    ) {
      //Do Nothing
    } else {
      this.stateMachine?.setState(playerStates.idle)
    }
  }

  private drivingOnEnter () {

  }

  private drivingOnUpdate () {
    
  }

  moveToPoint() {
    // PUT THIS IN INIT   
    // this.scene.input.on(Phaser.Input.Events.POINTER_UP, (pointer: Phaser.Input.Pointer) => {

    //   const { worldX, worldY } = pointer

    //   const startVec = this.map.getLayers().groundLayer.worldToTileXY(this.x, this.y)
    //   const targetVec = this.map.getLayers().groundLayer.worldToTileXY(worldX, worldY)

    //   const path = findPath(startVec, targetVec, this.map.getLayers().groundLayer, this.map.getLayers().collideLayer)
    //   this.moveAlong(path)
    // })

    // this.scene.events.on(Phaser.Scenes.Events.SHUTDOWN, () => {
    //   this.scene.input.off(Phaser.Input.Events.POINTER_UP)
    // })


    // PUT THIS IN UPDATE
    // let dx = 0
    // let dy = 0

    // if (this.moveToTarget) {
    //   dx = this.moveToTarget.x - this.x
    //   dy = this.moveToTarget.y - this.y

    //   if (Math.abs(dx) < 5) {
    //     dx = 0
    //   }
    //   if (Math.abs(dy) < 5) {
    //     dy = 0
    //   }

    //   if (dx === 0 && dy === 0) {
    //     if (this.movePath.length > 0) {
    //       this.moveTo(this.movePath.shift()!)
    //       return
    //     }

    //     this.moveToTarget = undefined
    //   }
    // }

    // const leftDown = dx < 0
    // const rightDown = dx > 0
    // const upDown = dy < 0
    // const downDown = dy > 0
    
    // if (leftDown)
    // {
    //   this.setVelocity(-this.speed, 0)
    // }
    // else if (rightDown)
    // {
    //   this.setVelocity(this.speed, 0)
    // }
    // else if (upDown)
    // {
    //   this.setVelocity(0, -this.speed)
    // }
    // else if (downDown)
    // {
    //   this.setVelocity(0, this.speed)
    // }
  }
}