import StateMachine from '@/phaser/utils/StateMachine';
import Phaser from 'phaser'

enum carStates {
  idle = 'idle',
  drive = 'drive',
  destroyed = 'destroyed',
}

export default class Car extends Phaser.Physics.Arcade.Sprite {
  private stateMachine?: StateMachine
  private speed: number = 400 
  private keyInputs: {
    [key: string]: Phaser.Input.Keyboard.Key;
  } = {}

  hasPlayerIn: boolean = false
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'car', 'LuxuryCar/luxury_car_w.png')
    
    scene.add.existing(this)
    scene.physics.add.existing(this)

    this.init()
    this.initEvents()
    this.createStateMachine()
    this.setDepth(y+10)
  }

  private init(): void {
    this.setCollideWorldBounds(true)
    this.body.setSize(200, 50, true)
    this.body.setOffset(0, 80)
    this.setScale(0.8)
    this.setInteractive()
    this.setImmovable(true)

    this.keyInputs['keyW'] = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W)
    this.keyInputs['keyS'] = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S)
    this.keyInputs['keyA'] = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
    this.keyInputs['keyD'] = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
  }

  initEvents() {
    this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this)
  }

  update(dt: number) {
    if (this.hasPlayerIn === true) {
      this.stateMachine?.update(dt)     
      
      this.setDepth(this.y) 
    }
    
  }

  private createStateMachine(): void {
    this.stateMachine = new StateMachine(this, 'car')

    this.stateMachine
      .addState(carStates.idle, {
        onEnter: this.idleOnEnter,
        onUpdate: this.idleOnUpdate
      })
      .addState(carStates.drive, {
        onEnter: this.driveOnEnter,
        onUpdate: this.driveOnUpdate
      })
      .setState(carStates.idle)
  }

  idleOnEnter() {

  }

  idleOnUpdate() {
    if (
      this.keyInputs['keyD'].isDown || 
      this.keyInputs['keyA'].isDown || 
      this.keyInputs['keyW'].isDown || 
      this.keyInputs['keyS'].isDown
    ) {
      this.stateMachine?.setState(carStates.drive)
    }
  }

  driveOnEnter() {

  }

  driveOnUpdate() {
    this.setVelocity(0)
    this.setDrag(1000)

    if (this.keyInputs['keyD'].isDown) {
      this.setVelocityX(this.speed)
      this.setTexture('car', 'LuxuryCar/luxury_car_w.png')
    } 
    else if (this.keyInputs['keyA'].isDown) {
      this.setVelocityX(-this.speed)
      this.setTexture('car', 'LuxuryCar/luxury_car_e.png')
    } 
    else if (this.keyInputs['keyW'].isDown) {
      this.setVelocityY(-this.speed)
      this.setTexture('car', 'LuxuryCar/luxury_car_s.png')
    } 
    else if (this.keyInputs['keyS'].isDown) {
      this.setVelocityY(this.speed)
      this.setTexture('car', 'LuxuryCar/luxury_car_n.png')
    } 
    
    if (this.keyInputs['keyW'].isDown && this.keyInputs['keyD'].isDown) {
      this.setVelocity(this.speed, -this.speed)
      this.setTexture('car', 'LuxuryCar/luxury_car_sw.png')
    } 
    else if (this.keyInputs['keyW'].isDown && this.keyInputs['keyA'].isDown) {
      this.setVelocity(-this.speed, -this.speed)
      this.setTexture('car', 'LuxuryCar/luxury_car_se.png')
    } 
    else if (this.keyInputs['keyS'].isDown && this.keyInputs['keyD'].isDown) {
      this.setVelocity(this.speed, this.speed)
      this.setTexture('car', 'LuxuryCar/luxury_car_nw.png')
    } 
    else if (this.keyInputs['keyS'].isDown && this.keyInputs['keyA'].isDown) {
      this.setVelocity(-this.speed, this.speed)
      this.setTexture('car', 'LuxuryCar/luxury_car_ne.png')
    }

    if (
      this.keyInputs['keyD'].isDown || 
      this.keyInputs['keyA'].isDown || 
      this.keyInputs['keyW'].isDown || 
      this.keyInputs['keyS'].isDown
    ) {
      //Do Nothing
    } else {
      this.stateMachine?.setState(carStates.idle)
    }
  }
}