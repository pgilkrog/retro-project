import { Scene } from 'phaser'

export default class MainMenu extends Scene {
  constructor() {
    super({ key: 'MainMenu' })
  }

  create() {
    this.cameras.main.setZoom(0.85).setOrigin(0,0)
    this.add.image(0, 0, 'menuImage').setOrigin(0)

    // this.add.text(100, 100, 'Main Menu', { fontSize: '32px', fill: '#fff' })
  
    // add a text and make it blink
    const startText = this.add.text(260, 330, 'Press ENTER to Start', { fontSize: '32px', color: '#fff' })
    this.tweens.add({
      targets: startText,
      alpha: { from: 1, to: 0 },
      duration: 500,
      ease: 'Linear',
      yoyo: true,
      repeat: -1
    })

    this.input.keyboard?.on('keydown-ENTER', () => {
      this.scene.start('Game')
    })
  }
}
