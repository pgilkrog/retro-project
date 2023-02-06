import Phaser from 'phaser'
import Loader from './scenes/Loader'
import GameScene from './scenes/Game'

function launch(containerId: string) {
    return new Phaser.Game({
      type: Phaser.AUTO,
      width: "800",
      height: "600",
      pixelArt: true,
      parent: containerId,
      physics: {
        default: "arcade"
      },
      scale: {
          parent: containerId,
          mode: Phaser.Scale.FIT,
          autoCenter: Phaser.Scale.CENTER_BOTH,
          width: 800,
          height: 600
      },
      scene: [Loader, GameScene]
    })
}

export default launch
export { launch }