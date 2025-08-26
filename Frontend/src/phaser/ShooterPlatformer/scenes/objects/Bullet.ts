export class Bullet extends Phaser.Physics.Matter.Sprite {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene.matter.world, x, y, 'bullet')

    this.scene = scene
    this.scene.add.existing(this)
    this.setActive(false)
    this.setVisible(false)
    this.setScale(0.1)

    this.setOnCollide((data: MatterJS.ICollisionPair) => {
      this.setActive(false)
      this.setVisible(false)
    })
  }

  fire(x: number, y: number, velocityX: number, velocityY: number) {
    this.setPosition(x, y)
    this.setActive(true)
    this.setVisible(true)
    this.setVelocity(velocityX, velocityY)
  }

  preUpdate(time: number, delta: number) {
    super.preUpdate(time, delta)

    if (
      this.y < 0 ||
      this.y > Number(this.scene.sys.game.config.height) ||
      this.x < 0 ||
      this.x > Number(this.scene.sys.game.config.width)
    ) {
      console.log('bullet out of bounds')
      this.setInactive()
    }
  }

  setInactive() {
    this.setActive(false)
    this.setVisible(false)
    this.setVelocity(0, 0)
  }
}
