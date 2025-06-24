import { Scene } from 'phaser'

export default class MainMenu extends Scene {
  constructor() {
    super({ key: 'MainMenu' })
  }

  create() {
    this.add.text(100, 100, 'Main Menu', { fontSize: '32px', fill: '#fff' })
    this.add.text(100, 200, 'Press Enter to Start', { fontSize: '24px', fill: '#fff' })

    this.input.keyboard?.on('keydown-ENTER', () => {
      this.scene.start('Game')
    })
  }
}
