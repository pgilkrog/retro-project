import Phaser from 'phaser'

import BootScene from '@/phaser/first-game/scenes/Loader'
import PlayScene from '@/phaser/first-game/scenes/Game'
import GameOver from '@/phaser/first-game/scenes/GameOver'
import SelectCharacterScene from '@/phaser/first-game/scenes/SelectCharacterScene'

import UI from '@/phaser/first-game/scenes/UI'

function launch(containerId: string) {
    return new Phaser.Game({
        type: Phaser.AUTO,
        width: "100%",
        height: "100%",
        pixelArt: true,
        parent: containerId,
        physics: {
            default: "matter",
            matter: {
                debug: false,
                setBounds: { 
                    left: true,
                    right: true,
                    top: true,
                    bottom: true
                }
            }
        },
        scale: {
            parent: containerId,
            mode: Phaser.Scale.FIT,
        },
        scene: [BootScene, SelectCharacterScene, PlayScene, UI, GameOver]
    })
}

export default launch
export { launch }