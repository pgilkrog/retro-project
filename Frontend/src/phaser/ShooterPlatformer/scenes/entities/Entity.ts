import StateMachine from '../../../utils/StateMachine'

export default class PlayerController {
  protected scene: Phaser.Scene | undefined
  protected stateMachine: StateMachine | undefined
  protected sprite: Phaser.Physics.Matter.Sprite | undefined

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
    this.sprite = this.scene?.matter.add.sprite(spawnX, spawnY, entityName, 'idle_0.png')
    this.speed = speedValue
    this.health = healthValue
    this.create()
    this.setStates()
  }

  create() {}

  setStates() {}
}
