import { Bullet } from './Bullet'

export default class PlayerController {
  private scene: Phaser.Scene | undefined
  private bullets: Phaser.GameObjects.Group | undefined
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
    let bullet = this.bullets?.getFirstDead(false)

    if (
      bullet == undefined &&
      this.scene != undefined &&
      this.bullets != undefined &&
      this.bullets.getLength() < this.bulletAmount
    ) {
      bullet = new Bullet(this.scene, x, y)
      this.bullets?.add(bullet)
      console.log('bullet created', this.bullets?.getLength())
    }

    return bullet
  }
}
