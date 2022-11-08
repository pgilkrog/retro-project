import Phaser from 'phaser'
import Create from './scenes/Create'
import Loader from './scenes/Loader'
import Menu from './scenes/Menu'
import Score from './scenes/Score'
import Pause from './scenes/Pause'

function launch(containerId: string) {
    return new Phaser.Game({
        type: Phaser.AUTO,
        width: "2800",
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
        scene: [Loader, Create, Menu, Score, Pause]
    })
}

export default launch
export { launch } 