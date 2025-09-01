import { Bullet } from './Bullet'

export default class PlayerController {
  private scene: Phaser.Scene
  private bullets: Phaser.GameObjects.Group
  private bulletAmount: number = 100

  constructor(scene: Phaser.Scene) {
    this.scene = scene

    this.bullets = scene.add.group({
      classType: Bullet,
      maxSize: this.bulletAmount,
      runChildUpdate: true,
    })
  }

  getBullet(x: number, y: number) {
    let bullet = this.bullets.getFirstDead()

    if (
      bullet == undefined &&
      this.scene != undefined &&
      this.bullets != undefined &&
      this.bullets.getLength() < this.bulletAmount
    ) {
      bullet = new Bullet(this.scene, x, y)
      this.bullets.add(bullet)
      console.log('bullet created', this.bullets.getLength())
    }

    return bullet
  }
}
