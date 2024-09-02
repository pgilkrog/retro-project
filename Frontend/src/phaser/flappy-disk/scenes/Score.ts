import Phaser from 'phaser'

export default class Score extends Phaser.Scene {
  private screenCenter = [800 / 2, 600 / 2]
  private bestScore: String = ''
  private fontOptions = {fontSize: `${34}px`, fill: '#fff'}
  private backButton: any
  
  constructor() {
    super('Score')
  }

  create() {
    this.bestScore = localStorage.getItem('bestScore') || ''
    this.add.text(this.screenCenter[0],this.screenCenter[0], `Best Score: ${this.bestScore || 0}`, this.fontOptions)
      .setOrigin(0.5)

    this.backButton = this.add.image(800 - 10, 600 -10, 'backButton')
      .setOrigin(1)
      .setScale(2)
      .setInteractive()

    this.backButton.on('pointerup', () => {
      this.scene.start('Menu');
    })
  }
}