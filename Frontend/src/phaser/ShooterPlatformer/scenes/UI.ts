import Phaser, { Scene } from 'phaser'
import { sharedInstance as events, CUSTOM_EVENTS } from './EventCenter'

export default class UI extends Scene {
  private bulletsAmount: Phaser.GameObjects.Text

  private graphicHealthBar: Phaser.GameObjects.Graphics
  private maxHealth: number = 100
  private currentHealth: number = 100

  constructor() {
    super({ key: 'ui' })
  }

  create() {
    this.graphicHealthBar = this.add.graphics()
    this.setHealthBar(this.maxHealth)

    this.bulletsAmount = this.add.text(10, 40, 'Bullets: 50', {
      fontSize: '32px',
    })

    events.on(CUSTOM_EVENTS.BULLETS_CHANGED, this.handleBulletsChange, this)

    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
      events.off(CUSTOM_EVENTS.BULLETS_CHANGED, this.handleBulletsChange, this)
    })
  }

  private setHealthBar(value: number) {
    const width = 200
    const percent = Phaser.Math.Clamp(value, 0, 100) / 100

    this.graphicHealthBar.clear()
    this.graphicHealthBar.fillStyle(0x808080)
    this.graphicHealthBar.fillRoundedRect(10, 10, width, 20, 0)

    if (percent > 0) {
      this.graphicHealthBar.fillStyle(0xff0000)
      this.graphicHealthBar.fillRoundedRect(10, 10, width * percent, 20, 0)
    }
  }

  handleBulletsChange(value: number) {
    this.bulletsAmount.setText(`Bullets: ${value}`)
  }
}
