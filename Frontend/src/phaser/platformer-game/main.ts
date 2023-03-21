import Phaser from 'phaser'
import PlayScene from './scenes/PlayScene'
import Prelaod from './scenes/Preload'

function launch(containerId: string) {
    const MAP_WIDTH = 1600;

    const WIDTH = document.body.offsetWidth;
    const HEIGHT = 600;

    const SHARED_CONFIG = {
        mapOffset: MAP_WIDTH > WIDTH ? MAP_WIDTH - WIDTH : 0,
        width: WIDTH,
        height: HEIGHT,
        zoomFactor: 1.5
    }

    const Scenes = [Prelaod, PlayScene]
    const createScene = (Scene: any) => new Scene(SHARED_CONFIG)
    const initScenes = () => Scenes.map(createScene)

    return new Phaser.Game({
        type: Phaser.AUTO,
        ...SHARED_CONFIG,
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
        scene: initScenes()
    })
}

export default launch
export { launch } 