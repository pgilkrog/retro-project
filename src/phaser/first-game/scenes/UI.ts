import Phaser, { Scene } from 'phaser'
import { sharedInstance as events } from '@/phaser/first-game/scenes/EventCenter'

export default class UI extends Scene {
    private heartsLabel!: Phaser.GameObjects.Text
    private heartsCollected = 0

    constructor() {
        super({ key: 'ui' })
    }

    init() {
        this.heartsCollected = 0
    }

    create() {
        this.heartsLabel = this.add.text(10, 10, 'Hearts: 0', {
            fontSize: '32px'
        })

        events.on('heart-collected', this.handleHeartCollected, this)

        this.events.on(Phaser.Scenes.Events.DESTROY, () => {
            events.off('heart-collected', this.handleHeartCollected, this)
        })
    }

    private handleHeartCollected()
    {
        ++this.heartsCollected
        this.heartsLabel.text = `Hearts: ${this.heartsCollected}`
    }
}