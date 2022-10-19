import Phaser, { Scene } from 'phaser'
import { sharedInstance as events } from '@/phaser/first-game/scenes/EventCenter'

export default class UI extends Scene {
    private heartsLabel!: Phaser.GameObjects.Text
    private heartsCollected = 0
    private graphicHealth!: Phaser.GameObjects.Graphics
    private graphicMana!: Phaser.GameObjects.Graphics
    private graphicEnergy!: Phaser.GameObjects.Graphics
    private lastHealth = 100
    private lastMana = 100
    private lastEnergy = 100

    private selectedCharacter = ""

    constructor() {
        super({ key: 'ui' })
    }

    init(data: any) {
        this.heartsCollected = 0
        this.selectedCharacter = data.character
    }

    create() {
        this.graphicHealth = this.add.graphics()
        this.graphicMana = this.add.graphics()
        this.graphicEnergy = this.add.graphics()
        this.setHealthBar(100)
        if(this.selectedCharacter === "Mage")
            this.setManaBar(100)
        else if (this.selectedCharacter === "Rogue")
            this.setEnergyBar(100)

        this.heartsLabel = this.add.text(10, 65, 'Hearts: 0', {
            fontSize: '32px'
        })

        events.on('heart-collected', this.handleHeartCollected, this)
        events.on('health-changed', this.handleHealthChanged, this)
        events.on('mana-changed', this.handleManaChanged, this)
        events.on('energy-changed', this.handleEnergyChanged, this)

        this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
            events.off('heart-collected', this.handleHeartCollected, this)
        })
    }

    private setHealthBar(value: number) {
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

    private setManaBar(value: number) {
        const width = 200;
        const percent = Phaser.Math.Clamp(value, 0 , 100) / 100

        this.graphicMana.clear()
        this.graphicMana.fillStyle(0x808080)
        this.graphicMana.fillRoundedRect(10, 35, width, 20, 0)
        if (percent > 0) {
            this.graphicMana.fillStyle(0x0000ff)
            this.graphicMana.fillRoundedRect(10, 35, width * percent, 20, 0)   
        }
    }

    private setEnergyBar(value: number) {
        const width = 200;
        const percent = Phaser.Math.Clamp(value, 0 , 100) / 100

        this.graphicEnergy.clear()
        this.graphicEnergy.fillStyle(0x808080)
        this.graphicEnergy.fillRoundedRect(10, 35, width, 20, 0)
        if (percent > 0) {
            this.graphicEnergy.fillStyle(0xffff00)
            this.graphicEnergy.fillRoundedRect(10, 35, width * percent, 20, 0)   
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

    private handleEnergyChanged(value: number) {
        this.tweens.addCounter({
            from: this.lastEnergy,
            to: value,
            duration: 200,
            ease: Phaser.Math.Easing.Sine.InOut,
            onUpdate: tween => {
                const value = tween.getValue()
                this.setManaBar(value)
            }
        })
        
        this.lastEnergy = value
    }
}