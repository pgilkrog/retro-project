export default class CardController {
  private scene: Phaser.Scene | undefined 
  private sprite: Phaser.Physics.Arcade.Sprite | undefined

  constructor(scene: Phaser.Scene, x: number, y: number) {
    this.scene = scene
    this.sprite = scene.physics.add
      .sprite(x, y, 'cardBomb')
      .setImmovable(true)
      .setVisible(true)

    this.sprite.setSize(48, 48).setOffset(0, 0)
  }
}