import Phaser from 'phaser'

export default class Player extends Phaser.Physics.Arcade.Sprite {
  private speed = 200 as number
  private map: any

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
    this.body.setSize(24, 36, true)
    this.body.setOffset(10, 4)
    this.setScale(1.2)
  
    this.scene.input.on(Phaser.Input.Events.POINTER_UP, (pointer: Phaser.Input.Pointer) => {
     
      const { worldX, worldY } = pointer

      const startVec = this.map.getLayers().collideLayer.worldToTileXY(this.x, this.y)
      const targetVec = this.map.getLayers().collideLayer.worldToTileXY(worldX, worldY) 
      console.log("PRESSED", startVec, targetVec)
    })

    this.scene.events.on(Phaser.Scenes.Events.SHUTDOWN, () => {
      this.scene.input.off(Phaser.Input.Events.POINTER_UP)
    })
  }

  update() {
    this.setVelocity(0)
    this.setDrag(1000)

    if (this.keyInputs['keyD'].isDown) {
      this.setVelocityX(this.speed)
    } else if (this.keyInputs['keyA'].isDown) {
      this.setVelocityX(-this.speed)
    }

    if (this.keyInputs['keyW'].isDown) {
      this.setVelocityY(-this.speed)
    } else if (this.keyInputs['keyS'].isDown) {
      this.setVelocityY(this.speed)
    }
  }

  initEvents() {
    this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this)
  }

  createKeyInputs() {
    this.keyInputs['keyW'] = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.keyInputs['keyS'] = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.keyInputs['keyA'] = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.keyInputs['keyD'] = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);    
  }
}