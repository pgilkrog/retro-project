import EnemyController from './EnemyController'

export default class EnemyCaptain extends EnemyController {
  constructor(scene: Phaser.Scene, sprite: string, x: number, y: number, health: number) {
    super(scene, sprite, x, y, health)
  }

  create() {
    super.create()
    this.sprite.setTint(0xff0000)
  }

  update(dt: number) {
    super.update(dt)
  }

  setStates() {
    super.setStates()
  }
}
