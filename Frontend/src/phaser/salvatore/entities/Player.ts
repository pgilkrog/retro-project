import Phaser from 'phaser'
import findPath from '../utils/findPath'
import StateMachine from '@/phaser/utils/StateMachine'

enum playerStates {
  idle = 'idle',
  walk = 'walk',
  death = 'death',
  attack = 'attack',
  combat = 'combat',
  driving = 'driving'
}

enum playerAnims {
  idle = 'idle'
}

export default class Player extends Phaser.Physics.Arcade.Sprite {
  private speed = 200 as number
  private map: any
  private stateMachine?: StateMachine

  private movePath: Phaser.Math.Vector2[] = []
  private moveToTarget?: Phaser.Math.Vector2

  private keyInputs: {
    [key: string]: Phaser.Input.Keyboard.Key;
  } = {};

  constructor(scene: Phaser.Scene, x: number, y: number, map: any) {
    super(scene, x, y, 'player')

    scene.add.existing(this)
    scene.physics.add.existing(this)

    this.map = map

    this.init()
    this.initEvents()
    this.createKeyInputs()
  }

  init() {
    this.setCollideWorldBounds(true)
    this.body.setSize(20, 10, true)
    this.body.setOffset(6, 38)
    this.setInteractive()

    this.createStateMachine()
    this.createAnimations()

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
  }

  update(dt: number) {
    this.stateMachine?.update(dt)
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
    this.anims.play('characterWalkRight')
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
      this.anims.play('characterWalkRight')
    else if(this.keyInputs['keyA'].isDown)
      this.anims.play('characterWalkLeft')
    else if(this.keyInputs['keyW'].isDown)
      this.anims.play('characterWalkUp')
    else if(this.keyInputs['keyS'].isDown)
      this.anims.play('characterWalkDown')
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

  private createAnimations() {
    this.anims.create({
      key: 'characterIdle',
      frames: this.anims.generateFrameNames('player', { start: 1, end: 1, prefix: 'Player/walk_down_2', suffix: '.png' }),
      repeat: 0,
      frameRate: 6
    }) 
    this.anims.create({
      key: 'characterWalkLeft',
      frames: this.anims.generateFrameNames('player', { start: 1, end: 3, prefix: 'Player/walk_left_', suffix: '.png' }),
      repeat: -1,
      frameRate: 6
    }) 
    this.anims.create({
      key: 'characterWalkRight',
      frames: this.anims.generateFrameNames('player', { start: 1, end: 3, prefix: 'Player/walk_right_', suffix: '.png' }),
      repeat: -1,
      frameRate: 6
    }) 
    this.anims.create({
      key: 'characterWalkUp',
      frames: this.anims.generateFrameNames('player', { start: 1, end: 3, prefix: 'Player/walk_up_', suffix: '.png' }),
      repeat: -1,
      frameRate: 6
    }) 
    this.anims.create({
      key: 'characterWalkDown',
      frames: this.anims.generateFrameNames('player', { start: 1, end: 3, prefix: 'Player/walk_down_', suffix: '.png' }),
      repeat: -1,
      frameRate: 6
    }) 
  }
}