import StateMachine from '../../../utils/StateMachine'
import Phaser from 'phaser'

export default class EntityController {
  protected scene: Phaser.Scene
  protected stateMachine: StateMachine
  public sprite: Phaser.Physics.Matter.Sprite

  protected health: number
  protected maxHealth: number
  protected speed: number
  protected runSpeed: number

  constructor(
    scene: Phaser.Scene,
    entityName: string,
    spawnX: number,
    spawnY: number,
    speedValue: number = 6,
    runSpeedValue: number = 10,
    healthValue: number = 100
  ) {
    this.scene = scene
    this.stateMachine = new StateMachine(this, entityName)
    this.sprite = scene.matter.add.sprite(spawnX, spawnY, entityName, '')
    this.speed = speedValue
    this.runSpeed = runSpeedValue
    this.health = healthValue
    this.maxHealth = healthValue

    this.create()
    this.setStates()
    this.createAnimations()

    this.stateMachine.setState('idle')
  }

  protected create() {}

  public update(dt: number) {}

  protected createAnimations() {}

  protected setStates() {
    this.stateMachine
      .addState('idle', {
        onEnter: this.idleOnEnter,
        onUpdate: this.idleOnUpdate,
      })
      .addState('walk', {
        onEnter: this.walkOnEnter,
        onUpdate: this.walkOnUpdate,
      })
      .addState('dead', {
        onEnter: this.deadOnEnter,
      })
  }

  public setState(state: string) {
    if (this.stateMachine.isCurrentState(state) === false) {
      this.stateMachine.setState(state)
    }
  }

  public takeDamage(amount: number) {
    this.health -= amount

    if (this.health <= 0) {
      this.health = 0
      this.setState('dead')
    }

    this.scene.tweens.add({
      targets: this.sprite,
      duration: 100,
      repeat: 0,
      yoyo: true,
      ease: 'Linear',
      tint: { from: 0xffffff, to: 0xff0000 },
    })
  }

  idleOnEnter() {}
  idleOnUpdate(dt: number) {}
  walkOnEnter() {}
  walkOnUpdate(dt: number) {}
  deadOnEnter() {
    this.sprite.setVelocity(0, 0)
    this.sprite.play('dead')
    this.sprite.setCollisionCategory(0)
    this.sprite.setIgnoreGravity(true)
  }
}
