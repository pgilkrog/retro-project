import StateMachine from '../../../utils/StateMachine'

export default class PlayerController {
  protected scene: Phaser.Scene | undefined
  protected stateMachine: StateMachine | undefined
  public sprite: Phaser.Physics.Matter.Sprite | undefined

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
    if (this.stateMachine?.isCurrentState(state) === false) {
      this.stateMachine?.setState(state)
    }
  }
}
