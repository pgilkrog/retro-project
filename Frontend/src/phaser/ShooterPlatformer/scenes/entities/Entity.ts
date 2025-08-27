import StateMachine from '../../../utils/StateMachine'

export default class PlayerController {
  protected scene: Phaser.Scene
  protected stateMachine: StateMachine
  public sprite: Phaser.Physics.Matter.Sprite

  protected speed: number
  protected health: number

  constructor(
    scene: Phaser.Scene,
    entityName: string,
    spawnX: number,
    spawnY: number,
    speedValue: number = 6,
    healthValue: number = 100
  ) {
    this.scene = scene
    this.stateMachine = new StateMachine(this, entityName)
    this.sprite = scene.matter.add.sprite(spawnX, spawnY, entityName, '')
    this.speed = speedValue
    this.health = healthValue
    this.create()
    this.setStates()
  }

  protected create() {}

  protected setStates() {}

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

    if (this.sprite != undefined) {
      this.scene.tweens.add({
        targets: this.sprite,
        duration: 100,
        repeat: 0,
        yoyo: true,
        ease: 'Linear',
        tint: { from: 0xffffff, to: 0xff0000 },
      })
    }
  }
}
