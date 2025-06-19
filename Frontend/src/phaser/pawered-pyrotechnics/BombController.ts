export default class BombController {
  private timer: Phaser.Time.TimerEvent | undefined
  private scene: Phaser.Scene | undefined
  private sprite: Phaser.Physics.Arcade.Sprite | undefined

  private bombs: Phaser.GameObjects.Group | undefined

  constructor(scene: Phaser.Scene, x: number, y: number) {
    this.scene = scene
    this.sprite = scene.physics.add.sprite(x, y, 'bomb').setScale(0.1)

    this.bombs = scene.add.group({
      classType: BombController,
      maxSize: 40,
      runChildUpdate: true,
    })
  }

  getBomb(x: number, y: number) {
    let bomb = this.bombs?.getFirstDead(false)
    if (
      bomb == undefined &&
      this.scene != undefined &&
      this.bombs != undefined &&
      this.bombs.getLength() < 40
    ) {
      bomb = new BombController(this.scene, x, y)
      this.bombs?.add(bomb)
    }
  }
}
