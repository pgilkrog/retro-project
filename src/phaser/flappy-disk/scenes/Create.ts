import Phaser, { Scene } from 'phaser'

export default class Create extends Scene {
  private bird!: Phaser.Physics.Arcade.Sprite 
  private upperPipe!: Phaser.Physics.Arcade.Sprite 
  private lowerPipe!: Phaser.Physics.Arcade.Sprite 
  private pipeHorizontalDistance = 0

  private pipeVerticalDistanceRange = [100, 250]

  private VELOCITY = 200
  private PIPES_TO_RENDER = 4
  private space: any
  private initialBirdPosition = { x: 800 * 0.1, y: 600 / 2}

  constructor() {
    super({ key: 'Create' })
  }

  create() {
    this.add.image(0, 0, 'sky').setOrigin(0)

    this.bird = this.physics.add.sprite(this.initialBirdPosition.x, this.initialBirdPosition.y, 'bird')
      .setOrigin(0)
      .setGravityY(200)

    for (let i = 0; i < this.PIPES_TO_RENDER; i++) {
      this.pipeHorizontalDistance += 400
      let pipeVerticalDistance = Phaser.Math.Between(this.pipeVerticalDistanceRange[0], this.pipeVerticalDistanceRange[1])
      let pipeVerticalPosition = Phaser.Math.Between(0 + 20, 600 - 20 - pipeVerticalDistance)

      this.upperPipe = this.physics.add.sprite(this.pipeHorizontalDistance, pipeVerticalPosition, 'pipe').setOrigin(0, 1)
      this.lowerPipe = this.physics.add.sprite(this.upperPipe.x, this.upperPipe.y + pipeVerticalDistance, 'pipe').setOrigin(0, 0)      

      this.upperPipe.body.velocity.x = -200
      this.lowerPipe.body.velocity.x = -200
    }

    this.space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
  }

  update(time: number, delta: number) {
    if(this.bird === undefined)
      return

    if(this.bird.y > 600 || this.bird.y < -this.bird.height)
      this.restartBirdPosition()

    if(this.space.isDown)
      this.flap()
  }

  restartBirdPosition() {
    this.bird.x = this.initialBirdPosition.x
    this.bird.y = this.initialBirdPosition.y
    this.bird.body.velocity.y = 0
  }

  flap() {
    this.bird!.body.velocity.y = -this.VELOCITY
  }
}