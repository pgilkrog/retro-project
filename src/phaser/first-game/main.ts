import Phaser from 'phaser'
import BootScene from '@/phaser/first-game/scenes/Loader'
import PlayScene from '@/phaser/first-game/scenes/Game'
import UI from '@/phaser/first-game/scenes/UI'

function launch(containerId: string) {
    return new Phaser.Game({
        type: Phaser.AUTO,
        width: "100%",
        height: "100%",
        parent: containerId,
        physics: {
            default: "matter",
            matter: {
                debug: true
            }
        },
        scale: {
            parent: containerId,
            mode: Phaser.Scale.FIT,
        },
        scene: [BootScene, PlayScene, UI]
    })
}

export default launch
export { launch }