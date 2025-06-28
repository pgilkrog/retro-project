import Phaser from 'phaser'

export default class BaseScene extends Phaser.Scene {
  public screenCenter = [800 / 2, 600 / 2]
  public fontOptions = {fontSize: `${34}px`, fill: '#fff'}

  constructor(key: string) {
    super(key)
  }

  create() {
    this.add.image(0, 0, 'sky').setOrigin(0)
  }

  createMenu(menu: any) {
    let lastMenuPositionY = 0

    menu.forEach((menuItem: any) => {
      const menuPosition = [this.screenCenter[0], this.screenCenter[1] + lastMenuPositionY]
      this.add.text(menuPosition[0], menuPosition[1], menuItem.text, this.fontOptions).setOrigin(0.5, 1)
      menuItem.textGo = this.add.text(menuPosition[0], menuPosition[1], menuItem.text, this.fontOptions).setOrigin(0.5, 1)
      lastMenuPositionY += 42
      this.setupMenuEvents(menuItem)
    })
  }
  
  setupMenuEvents(menuItem: any) {
    const textGO = menuItem.textGo
    textGO.setInteractive()

    textGO.on('pointerover', () => {
      textGO.setStyle({fill: '#ff0'})
    })

    textGO.on('pointerout', () => {
      textGO.setStyle({fill: '#fff'})
    })

    textGO.on('pointerup', () => {
      menuItem.scene && this.scene.start(menuItem.scene)

      if (menuItem.text === 'Exit') {
        this.game.destroy(true)
      } else if (menuItem.scene && menuItem.text === 'Continue') {
        this.scene.stop()
        this.scene.resume(menuItem.scene)
        this.events.emit('resume')
      }
    })
  }
}