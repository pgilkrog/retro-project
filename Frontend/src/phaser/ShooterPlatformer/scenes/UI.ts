import Phaser, { Scene } from 'phaser'
import { sharedInstance as events } from '@/phaser/ShooterPlatformer/scenes/EventCenter'

export default class UI extends Scene {
  private bulletsAmount: Phaser.GameObjects.Text | undefined

  constructor() {
    super({ key: 'ui' })
  }

  create() {
    this.bulletsAmount = this.add.text(10, 10, 'Bullets: 50', {
      fontSize: '32px',
    })

    events.on('bullets-changed', this.handleBulletsChange, this)
  }

  handleBulletsChange(value: number) {
    this.bulletsAmount?.setText(`Bullets: ${value}`)
  }
}
