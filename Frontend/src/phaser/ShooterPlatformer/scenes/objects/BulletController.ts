export default class PlayerController {
  private scene: Phaser.Scene | undefined
  private bullets: Phaser.Physics.Matter.Image[] = []

  constructor(scene: Phaser.Scene) {
    this.scene = scene

    for (let i = 0; i < 20; i++) {
      const bullet = scene.matter.add.sprite(10, 300, 'bullet').setScale(0.1).setFixedRotation()
      bullet.active = false
      bullet.setOnCollide((data: MatterJS.ICollisionPair) => {
        bullet.active = false
      })
      this.bullets.push(bullet)
    }
  }

  shootBullet(x: number, y: number, speed: number = 20) {
    const bullet = this.bullets.find(
      (bullet: Phaser.Physics.Matter.Image) => bullet.active === false
    )

    if (bullet != undefined) {
      bullet.active = true
      bullet.setPosition(x, y)
      bullet.setVelocityX(speed)
    }
  }
}
