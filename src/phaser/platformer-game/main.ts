import Phaser from 'phaser'
import PlayScene from './scenes/PlayScene'
import Prelaod from './scenes/Preload'

function launch(containerId: string) {
    return new Phaser.Game({
        type: Phaser.AUTO,
        width: "800",
        height: "600",
        pixelArt: true,
        parent: containerId,
        physics: {
            default: "arcade",
            arcade: {
                debug: true
            }
        },
        scale: {
            parent: containerId,
            mode: Phaser.Scale.FIT,
            autoCenter: Phaser.Scale.CENTER_BOTH,
            width: 800,
            height: 600
        },
        scene: [Prelaod, PlayScene]
    })
}

export default launch
export { launch } 