import Phaser from 'phaser'
import initAnimations from './PlayerAnims'
import collidable from '../mixins/collidable'

export default class Player extends Phaser.Physics.Arcade.Sprite {
  private playerSpeed: number = 150
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys
  private jumpCount: number = 0

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'player')

    scene.add.existing(this)
    scene.physics.add.existing(this)

    this.init()
    this.initEvents()
  }

  init() {
    this.setGravity(500)
    this.cursors = this.scene.input.keyboard.createCursorKeys()
    this.setGravityY(500)
    this.setCollideWorldBounds(true)

    initAnimations(this.scene.anims)
  }

  initEvents() {
    this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this)
  }

  update(time: number, delta: number) {
    super.preUpdate(time, delta)
    const { left, right, space, up } = this.cursors
    const onFloor = (this.body as Phaser.Physics.Arcade.Body).onFloor()
    const isSpaceJustDown = Phaser.Input.Keyboard.JustDown(space)

    if (left.isDown) {
      this.setVelocityX(-this.playerSpeed)
      this.setFlipX(true)
    } else if (right.isDown) {
      this.setVelocityX(this.playerSpeed)
      this.setFlipX(false)
    } else
      this.setVelocityX(0)

    if (isSpaceJustDown && (onFloor || this.jumpCount < 1)) {
      this.setVelocityY(-this.playerSpeed * 2)
      this.jumpCount++
    }

    if(onFloor)
      this.jumpCount = 0

    onFloor ?
      this.body.velocity.x !== 0 ?
        this.play('run', true) : this.play('idle', true) :
      this.play('jump', true)
  }
}