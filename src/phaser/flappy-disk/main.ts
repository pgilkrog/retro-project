import Phaser from 'phaser'
import Create from './scenes/Create'
import Loader from './scenes/Loader'

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
                debug: false
            }
        },
        scale: {
            parent: containerId,
            mode: Phaser.Scale.FIT,
            autoCenter: Phaser.Scale.CENTER_BOTH,
            width: 800,
            height: 600
        },
        scene: [Loader, Create]
    })
}

export default launch
export { launch }