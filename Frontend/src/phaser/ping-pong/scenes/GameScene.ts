import Phaser, { Scene } from 'phaser'

type Sprite = Phaser.Physics.Arcade.Sprite

export default class Game extends Scene {
  private ball: Sprite | undefined = undefined
  private paddle1: Sprite | undefined = undefined
  private paddle2: Sprite | undefined = undefined

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

  private ballInitialSpeed: number = 400
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
      .setVelocity(this.ballInitialSpeed, this.ballInitialSpeed)
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
      this.paddle1.setVelocityY(0)
      this.paddle2.setVelocityY(0)

      let vy =
        this.paddle1.body.velocity.y +
        (this.keyW.isDown ? -this.acceleration : this.keyS.isDown ? this.acceleration : 0)

      vy = Phaser.Math.Clamp(vy, -this.targetVelocity, this.targetVelocity)
      this.paddle1.setVelocityY(vy)

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
        this.resetBall(false)
      }
      if (this.ball.x >= 790) {
        this.p1Points++
        this.scoreText1.setText(`${this.p1Points}`)
        this.pointUp.play()
        this.resetBall(true)
      }
    }
  }

  hitBall = () => {
    if (this.ball && this.ball.body && this.ball.body.velocity) {
      const vx = this.ball.body.velocity.x ?? 0
      const vy = this.ball.body.velocity.y ?? 0

      const signX = Math.sign(vx) || 1
      const signY = Math.sign(vy) || 1

      this.ball.setVelocityX(vx + signX * this.speedChange)
      this.ball.setVelocityY(vy + signY * this.speedChange)

      this.hitSound.play()
    }
  }

  createScores() {
    this.scoreText1 = this.add.text(10, 10, `${this.p1Points}`, { fontSize: '32px', color: '#fff' })
    this.scoreText2 = this.add.text(770, 10, `${this.p2Points}`, {
      fontSize: '32px',
      color: '#fff',
    })
  }

  resetBall(servingToRight = true) {
    const centerX = this.cameras.main.width / 2
    const centerY = this.cameras.main.height / 2
    this.ball?.setPosition(centerX, centerY)
    this.ball?.setVelocity(
      servingToRight ? this.ballInitialSpeed : -this.ballInitialSpeed,
      Phaser.Math.Between(-50, 50)
    )
  }
}
