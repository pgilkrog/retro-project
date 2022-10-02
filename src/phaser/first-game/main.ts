import Phaser from 'phaser'
import BootScene from '@/phaser/first-game/scenes/Loader'
import PlayScene from '@/phaser/first-game/scenes/Game'

function launch(containerId: string) {
    return new Phaser.Game({
        type: Phaser.AUTO,
        width: 960,
        height: 960,
        parent: containerId,
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 2000 },
                debug: true
            }
        },
        scale: {
            mode: Phaser.Scale.FIT
        },
        scene: [BootScene, PlayScene]
    })
}

export default launch
export { launch }