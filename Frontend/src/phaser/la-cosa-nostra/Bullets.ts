export class Bullet extends Phaser.Physics.Arcade.Sprite {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'ball')
  }

  public fire = (x: number, y: number, dis: Phaser.Math.Vector2) => {
    if (!this.body) return

    this.body?.reset(x, y)
    this.setScale(0.2)

    this.setActive(true)
    this.setVisible(true)

    this.setVelocity(dis.x, dis.y)
  }

  protected preUpdate(time: number, delta: number): void {
    super.preUpdate(time, delta)

    if (this.y <= -300) {
      this.setActive(false)
      this.setVisible(false)
    }
  }
} 

export default class Bullets extends Phaser.Physics.Arcade.Group {
  constructor(scene: Phaser.Scene) {
    super(scene.physics.world, scene)
  
    this.createMultiple({
      frameQuantity: 5,
      key: 'bullet',
      active: false,
      visible: false,
      classType: Bullet
    })
  }

  public fireBullet = (x: number, y: number, dis: Phaser.Math.Vector2) => {
    const bullet = this.getFirstDead(false)
    bullet.setDepth(10)

    if (bullet) bullet.fire(x, y, dis)
  }
}
