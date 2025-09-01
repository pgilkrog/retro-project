import { collisionCategories } from '../../../helpers/collisionCategories'
import Entity from '../Entity'

export default class NPCController extends Entity {
  constructor(scene: Phaser.Scene, sprite: string, x: number, y: number, health: number) {
    super(scene, sprite, x, y, undefined, health)
  }

  create() {
    this.sprite.setRectangle(24, 64).setFixedRotation().setFriction(0.5)
    this.sprite.setTint(0x00ff00)

    this.sprite.setCollisionCategory(collisionCategories.npc)
    this.sprite.setCollidesWith([1, collisionCategories.bullet])
  }

  update(dt: number) {
    this.stateMachine.update(dt)
    this.sprite.setDisplayOrigin(60, 96)
  }

  setStates() {
    super.setStates()
  }
}
