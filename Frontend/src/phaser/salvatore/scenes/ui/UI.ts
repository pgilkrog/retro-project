import Phaser from "phaser"
import type { IConfig } from '../../interfaces/IConfig'
import { sharedInstance as events } from '@/phaser/first-game/scenes/EventCenter'

type graphicT = Phaser.GameObjects.Graphics

export default class UIScene extends Phaser.Scene {
  private config: IConfig
  private uiData: any

  private graphicHealth!: Phaser.GameObjects.Graphics

  private lastHealth: number = 100
  
  constructor(config: IConfig) {
    super({ key: 'UIScene' })
    this.config = config
  }

  init(data: any) {
    this.uiData = data
  }

  create() {
    this.graphicHealth = this.add.graphics()
    this.setHealthBar(100)
    events.on('health-changed', this.handleHealthChanged, this)
  }

  setHealthBar(value: number) {
    const width = 200;
    const percent = Phaser.Math.Clamp(value, 0 , 100) / 100

    this.graphicHealth.clear()
    this.graphicHealth.fillStyle(0x808080)
    this.graphicHealth.fillRoundedRect(10, 10, width, 20, 0)
    if (percent > 0) {
        this.graphicHealth.fillStyle(0xff0000)
        this.graphicHealth.fillRoundedRect(10, 10, width * percent, 20, 0)   
    }
  }

  private handleHealthChanged(value: number) {
    this.tweens.addCounter({
      from: this.lastHealth,
      to: value,
      duration: 200,
      ease: Phaser.Math.Easing.Sine.InOut,
      onUpdate: tween => {
          const value = tween.getValue()
          this.setHealthBar(value)
      }
  })
  
  this.lastHealth = value
  }
}