import Phaser from 'phaser'
import BootScene from '@/phaser/scenes/Loader'
import PlayScene from '@/phaser/scenes/Game'

function launch(containerId: string) {
    return new Phaser.Game({
        type: Phaser.AUTO,
        width: 800,
        height: 600,
        parent: containerId,
        physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
        },
        scene: [BootScene, PlayScene]
    })
}

export default launch
export { launch }