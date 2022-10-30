import BaseScene from "./BaseScene"

export default class Create extends BaseScene {
  private bird!: Phaser.Physics.Arcade.Sprite 
  private pipes: any
  private pause!: any
  private upperPipe!: Phaser.Physics.Arcade.Sprite 
  private lowerPipe!: Phaser.Physics.Arcade.Sprite 

  private pipeVerticalDistanceRange = [100, 250]
  private pipeHorizontalDistanceRange = [400, 500]

  private VELOCITY = 300
  private PIPES_TO_RENDER = 4
  private space: any
  private esc: any
  private initialBirdPosition = { x: 800 * 0.1, y: 600 / 2}

  private rightMostX: any

  private score = 0
  private bestScore = 0
  private scoreText!: Phaser.GameObjects.Text

  private initialTime: any
  private countDownText: any
  private timedEvent: any

  private pauseEvent: any

  constructor() {
    super('Create')
  }

  create() {
    super.create()
    this.bird = this.physics.add.sprite(this.initialBirdPosition.x, this.initialBirdPosition.y, 'bird')
      .setOrigin(0)
      .setGravityY(600)
      .setCollideWorldBounds(true)
    
    this.pause = this.add.image(800 - 10, 600 - 10, 'pause')
      .setScale(3)
      .setOrigin(1)

    this.pipes = this.physics.add.group()

    for (let i = 0; i < this.PIPES_TO_RENDER; i++) {
      this.upperPipe = this.pipes.create(0, 0, 'pipe').setImmovable(true).setOrigin(0, 1)
      this.lowerPipe = this.pipes.create(0, 0, 'pipe').setImmovable(true).setOrigin(0, 0)      

      this.placePipe(this.upperPipe, this.lowerPipe)
    }

    this.pipes.setVelocityX(-200)

    this.space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
    this.esc = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC)

    this.physics.add.collider(this.bird, this.pipes, this.gameOver, undefined, this)
    this.createScore()
    this.listenToEvents()
  }

  update(time: number, delta: number) {
    if(this.bird === undefined)
      return

    if(this.bird.getBounds().bottom >= 600 || this.bird.y <= 0)
      this.gameOver()

    if(this.space.isDown)
      this.flap()

    else if (this.esc.isDown)
      this.pauseGame()

    this.recyclePipes()
  }

  createScore() {
    this.score = 0
    this.scoreText = this.add.text(16, 16, `Score: ${0}`, { fontSize: '32px', color: '#000' })
    const bestScore = localStorage.getItem('bestScore')
    this.add.text(16, 52, `Best Score: ${bestScore || 0}`, { fontSize: '32px', color: '#000' })
  }

  increaseScore() {
    this.score++
    this.scoreText.setText(`Score: ${this.score}`)
  }

  saveBestScore() {
    const bestScoreText = localStorage.getItem('bestScore') || ""
    this.bestScore = parseInt(bestScoreText, 10)
    if (!this.bestScore || this.score > this.bestScore)
      localStorage.setItem('bestScore', this.score.toString())
  }

  placePipe(uPipe: any, lPipe: any) {
    this.rightMostX = this.getRightMostPipes()
    let pipeVerticalDistance = Phaser.Math.Between(this.pipeVerticalDistanceRange[0], this.pipeVerticalDistanceRange[1])
    let pipeVerticalPosition = Phaser.Math.Between(0 + 20, 600 - 20 - pipeVerticalDistance) 
    let pipeHorizontalDistance = Phaser.Math.Between(this.pipeHorizontalDistanceRange[0], this.pipeHorizontalDistanceRange[1])

    uPipe.x = this.rightMostX + pipeHorizontalDistance
    uPipe.y = pipeVerticalPosition

    lPipe.x = uPipe.x
    lPipe.y = uPipe.y + pipeVerticalDistance

    // lPipe.body.velocity.x = -200
    // uPipe.body.velocity.x = -200
  }

  recyclePipes() {
    const tempPipes: any = []
    this.pipes.getChildren().forEach((pipe: any) => {
      if (pipe.getBounds().right <= 0) {
        tempPipes.push(pipe)
        if(tempPipes.length === 2) {
          this.placePipe(tempPipes[0], tempPipes [1])
          this.increaseScore()
          this.saveBestScore()
        }
      }
    })
  }

  getRightMostPipes() {
    let rightMostX = 0

    this.pipes.getChildren().forEach(function(pipe: any) {
      rightMostX = Math.max(pipe.x, rightMostX)
    })

    return rightMostX
  }

  pauseGame() {
    this.physics.pause()
    this.scene.pause()
    this.scene.launch('PauseScene')
  }

  listenToEvents() {
    if(this.pauseEvent) {return}

    this.pauseEvent = this.events.on('resume', () => {
      this.initialTime = 3;
      this.countDownText = this.add.text(this.screenCenter[0],this.screenCenter[1], 'Fly in: ' + this.initialTime, this.fontOptions).setOrigin(0.5);
      this.timedEvent = this.time.addEvent({
        delay: 1000,
        callback: () => this.countDown,
        callbackScope: this,
        loop: true
      })
    })
  }

  countDown() {
    this.initialTime--;
    this.countDownText.setText('Fly in: ' + this.initialTime);
    if (this.initialTime <= 0) {
      this.countDownText.setText('');
      this.physics.resume();
      this.timedEvent.remove();
    }
  }

  gameOver() {
    // this.bird.x = this.initialBirdPosition.x
    // this.bird.y = this.initialBirdPosition.y
    // this.bird.body.velocity.y = 0
    this.physics.pause()
    this.bird.setTint(0xEE4824)
    this.saveBestScore()

    this.time.addEvent({
      delay: 1000,
      callback: () => {
        this.scene.restart()
      },
      loop: false
    })
  }

  flap() {
    this.bird!.body.velocity.y = -this.VELOCITY
  }
}