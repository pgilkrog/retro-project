import { Scene } from 'phaser'

const api = import.meta.env.VITE_BASE_URL

export default class Loader extends Scene {
  constructor() {
    super({ key: 'Loader' })
  }

  preload() {
    this.load.image('sky', api + '/assets/flappydisk/sky.png')    
    this.load.image('bird', api + '/assets/flappydisk/bird.png')
    this.load.image('pipe', api + '/assets/flappydisk/pipe.png')
    this.load.image('pause', api + '/assets/flappydisk/pause.png')
    this.load.image('backButton', api + '/assets/flappydisk/back.png')
  }

  create() {
    this.scene.start('Menu')
  }
} 