import Phaser, { Scene } from 'phaser'
import { sharedInstance as events } from '@/phaser/first-game/scenes/EventCenter'

export default class UI extends Scene {
    private heartsLabel!: Phaser.GameObjects.Text
    private heartsCollected = 0
    private graphics!: Phaser.GameObjects.Graphics
    private graphics2!: Phaser.GameObjects.Graphics
    private lastHealth = 100
    private lastMana = 100

    constructor() {
        super({ key: 'ui' })
    }

    init() {
        this.heartsCollected = 0
    }

    create() {
        this.graphics = this.add.graphics()
        this.graphics2 = this.add.graphics()
        this.setHealthBar(100)
        this.setManaBar(100)

        this.heartsLabel = this.add.text(10, 65, 'Hearts: 0', {
            fontSize: '32px'
        })

        events.on('heart-collected', this.handleHeartCollected, this)
        events.on('health-changed', this.handleHealthChanged, this)
        events.on('mana-changed', this.handleManaChanged, this)

        this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
            events.off('heart-collected', this.handleHeartCollected, this)
        })
    }

    private setHealthBar(value: number) {
        const width = 200;
        const percent = Phaser.Math.Clamp(value, 0 , 100) / 100

        this.graphics.clear()
        this.graphics.fillStyle(0x808080)
        this.graphics.fillRoundedRect(10, 10, width, 20, 0)
        if (percent > 0) {
            this.graphics.fillStyle(0xff0000)
            this.graphics.fillRoundedRect(10, 10, width * percent, 20, 0)   
        }
    }

    private setManaBar(value: number) {
        const width = 200;
        const percent = Phaser.Math.Clamp(value, 0 , 100) / 100

        this.graphics2.clear()
        this.graphics2.fillStyle(0x808080)
        this.graphics2.fillRoundedRect(10, 35, width, 20, 0)
        if (percent > 0) {
            this.graphics2.fillStyle(0x0000ff)
            this.graphics2.fillRoundedRect(10, 35, width * percent, 20, 0)   
        }
    }

    private handleHeartCollected() {
        ++this.heartsCollected
        this.heartsLabel.text = `Hearts: ${this.heartsCollected}`
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

    private handleManaChanged(value: number) {
        this.tweens.addCounter({
            from: this.lastMana,
            to: value,
            duration: 200,
            ease: Phaser.Math.Easing.Sine.InOut,
            onUpdate: tween => {
                const value = tween.getValue()
                this.setManaBar(value)
            }
        })
        
        this.lastMana = value
    }
}