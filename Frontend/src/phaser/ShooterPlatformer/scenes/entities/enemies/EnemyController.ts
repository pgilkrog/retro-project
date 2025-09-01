import { collisionCategories } from '../../../helpers/collisionCategories'
import Entity from '../Entity'

export default class EnemyController extends Entity {
  constructor(scene: Phaser.Scene, sprite: string, x: number, y: number, health: number) {
    super(scene, sprite, x, y, undefined, health)
  }

  create() {
    this.sprite.setCollisionCategory(collisionCategories.enemy)
    this.sprite.setCollidesWith([1, collisionCategories.bullet])
  }

  setStates() {
    super.setStates()
    this.stateMachine
  }

  update(dt: number) {}
}
