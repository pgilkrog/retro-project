import Phaser, { Scene } from 'phaser'

export default class Game extends Scene {
  private ball!: Phaser.Physics.Arcade.Sprite
  private paddle1!: Phaser.Physics.Arcade.Sprite
  private paddle2!: Phaser.Physics.Arcade.Sprite
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
  
  constructor() {
    super({ key: 'GameScene' })
  }

  create(): void {
    this.ball = this.physics.add.sprite(50, 50, 'ball')
      .setCollideWorldBounds(true).setVelocity(200, 200)
    this.ball.body.bounce.set(1)

    this.paddle1 = this.physics.add.sprite(30, 300, 'paddle')
      .setCollideWorldBounds(true)
      .setImmovable(true)
    
    this.paddle2 = this.physics.add.sprite(770, 300, 'paddle')   
      .setCollideWorldBounds(true)
      .setImmovable(true)

    this.physics.add.collider(this.ball, this.paddle1, this.hitBall)
    this.physics.add.collider(this.ball, this.paddle2, this.hitBall)

    this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W)
    this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S)
    this.keyO = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.O)
    this.keyL = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.L)  

    this.hitSound = this.sound.add('hit-sound')
    this.pointUp = this.sound.add('point-up')
    
    this.createScores()
  }

  update(time: number, delta: number): void {
    this.paddle1.body.velocity.y = 0
    this.paddle2.body.velocity.y = 0

    if (this.keyW.isDown) {
      this.paddle1.body.velocity.y = -300
    } else if (this.keyS.isDown) {
      this.paddle1.body.velocity.y = 300
    }

    if (this.keyO.isDown) {
      this.paddle2.body.velocity.y = -300
    } else if (this.keyL.isDown) {
      this.paddle2.body.velocity.y = 300
    }

    if (this.ball.y < this.paddle2.y) {
      this.paddle2.setVelocityY(-200)
    } else if (this.ball.y > this.paddle2.y) {
      this.paddle2.setVelocityY(200)
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

  hitBall = () => {
    // Increase the ball velocity by 50 units each time it hits a paddle
    this.ball.setVelocityX(this.ball.body.velocity.x + 50)
    this.ball.setVelocityY(this.ball.body.velocity.y + 50)
    this.hitSound.play()
  }

  createScores() {
    this.scoreText1 = this.add.text(10, 10, `${this.p1Points}`,  { fontSize: '32px', color: '#fff' })
    this.scoreText2 = this.add.text(770, 10, `${this.p1Points}`,  { fontSize: '32px', color: '#fff' })
  }
}