import Phaser, { Scene } from 'phaser'

export default class Game extends Scene {
  private ball: Phaser.Physics.Arcade.Sprite | undefined = undefined
  private paddle1: Phaser.Physics.Arcade.Sprite | undefined = undefined
  private paddle2: Phaser.Physics.Arcade.Sprite | undefined = undefined

  private keyW: any
  private keyS: any
  private keyO: any
  private keyL: any

  private p1Points: number = 0
  private p2Points: number = 0

  private scoreText1!: Phaser.GameObjects.Text
  private scoreText2!: Phaser.GameObjects.Text

  private hitSound!: any
  private pointUp!: any

  private targetVelocity = 1000
  private acceleration = 300
  private speedChange = 10
  private damping = 0.95

  constructor() {
    super({ key: 'GameScene' })
  }

  create(): void {
    this.ball = this.physics.add
      .sprite(50, 50, 'ball')
      .setCollideWorldBounds(true)
      .setVelocity(200, 200)
    this.ball.setBounce(1)

    this.paddle1 = this.physics.add
      .sprite(30, 300, 'paddle')
      .setCollideWorldBounds(true)
      .setImmovable(true)

    this.paddle2 = this.physics.add
      .sprite(770, 300, 'paddle')
      .setCollideWorldBounds(true)
      .setImmovable(true)

    this.physics.add.collider(this.ball, this.paddle1, this.hitBall)
    this.physics.add.collider(this.ball, this.paddle2, this.hitBall)

    if (this.input.keyboard) {
      this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W)
      this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S)
      this.keyO = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.O)
      this.keyL = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.L)
    }

    this.hitSound = this.sound.add('hit-sound')
    this.pointUp = this.sound.add('point-up')

    this.createScores()
  }

  update(time: number, delta: number): void {
    if (this.ball?.body && this.paddle1?.body && this.paddle2?.body) {
      // const fixedDelta = 1 / 60
      // this.physics.world.update(time, fixedDelta)
      this.paddle1.setVelocityY(0)
      this.paddle2.setVelocityY(0)

      // Adjust as needed
      // this.ball.setVelocityX(this.ball.body.velocity.x * this.damping);
      // this.ball.setVelocityY(this.ball.body.velocity.y * this.damping);

      if (this.keyW.isDown) {
        this.paddle1.setVelocityY(
          Math.min(this.paddle1.body.velocity.y - this.acceleration, this.targetVelocity)
        )
      } else if (this.keyS.isDown) {
        this.paddle1.setVelocityY(
          Math.max(this.paddle1.body.velocity.y + this.acceleration, -this.targetVelocity)
        )
      }

      if (this.keyO.isDown) {
        this.paddle2.setVelocityY(-300)
      } else if (this.keyL.isDown) {
        this.paddle2.setVelocityY(300)
      }

      if (this.ball.y < this.paddle2.y) {
        this.paddle2.setVelocityY(
          Math.min(this.paddle2.body.velocity?.y - this.acceleration, this.targetVelocity)
        )
      } else if (this.ball.y > this.paddle2.y) {
        this.paddle2.setVelocityY(
          Math.max(this.paddle2.body.velocity.y + this.acceleration, -this.targetVelocity)
        )
      }

      if (this.ball.x <= 10) {
        this.p2Points++
        this.scoreText2.setText(`${this.p2Points}`)
        this.pointUp.play()
      }
      if (this.ball.x >= 790) {
        this.p1Points++
        this.scoreText1.setText(`${this.p1Points}`)
        this.pointUp.play()
      }
    }
  }

  hitBall = () => {
    // Increase the ball velocity by 50 units each time it hits a paddle
    if (this.ball && this.ball.body && this.ball.body.velocity) {
      this.ball.setVelocityX(this.ball.body.velocity.x + this.speedChange)
      this.ball.setVelocityY(this.ball.body.velocity.y + this.speedChange)
      this.hitSound.play()
    }
  }

  createScores() {
    this.scoreText1 = this.add.text(10, 10, `${this.p1Points}`, { fontSize: '32px', color: '#fff' })
    this.scoreText2 = this.add.text(770, 10, `${this.p1Points}`, {
      fontSize: '32px',
      color: '#fff',
    })
  }
}
