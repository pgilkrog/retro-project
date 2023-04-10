import Phaser from 'phaser'

export default class NPC extends Phaser.Physics.Arcade.Sprite {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'npc')

    scene.add.existing(this)
    scene.physics.add.existing(this)

    this.init()
  }

  init() {
    this.setCollideWorldBounds(true)
    this.body.setSize(24, 36, true)
    this.body.setOffset(5, 4)
    this.setScale(1.2)
    this.setInteractive()
    this.setImmovable(true)

    this.on('pointerdown', () => {
      console.log("CLICKED NPC")
    }, this)
  }
}