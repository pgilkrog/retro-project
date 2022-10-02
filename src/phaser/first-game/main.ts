import Phaser from 'phaser'
import BootScene from '@/phaser/first-game/scenes/Loader'
import PlayScene from '@/phaser/first-game/scenes/Game'

function launch(containerId: string) {
    return new Phaser.Game({
        type: Phaser.AUTO,
        width: 1024,
        height: 768,
        parent: containerId,
        physics: {
            default: "arcade",
            arcade: {
                gravity: { y: 300 },
                // debug: true
            }
        },
        scale: {
            parent: containerId,
            mode: Phaser.Scale.FIT,
            autoCenter: Phaser.Scale.CENTER_BOTH,
            
            min: {
                width: 800,
                height: 600
            },

            max: {
                width: 1600,
                height: 1200
            },

            zoom: 1
        },
        scene: [BootScene, PlayScene]
    })
}

export default launch
export { launch }