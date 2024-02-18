import { Scene } from 'phaser'
import hitSound from '@/phaser/test-stuff/assets/blip.mp3'
import pointUp from '@/phaser/test-stuff/assets/powerup.mp3'

const api = import.meta.env.VITE_BASE_URL

export default class Loader extends Scene {
  
  constructor() {
    super({ key: 'Loader' })
  }

  preload() {
    this.load.image('bigBox', api + '/assets/teststuff/bigBox.png')
    this.load.image('ball', api + '/assets/teststuff/ball.png')
    this.load.image('paddle', api + '/assets/teststuff/paddle.png')
    this.load.image('largeBox', api + '/assets/teststuff/2x4Box.png')
    this.load.image('bread', api + '/assets/teststuff/BreadSmall.png')

    // Sounds
    this.load.audio('hit-sound', hitSound)
    this.load.audio('point-up', pointUp)
  }

  create() {
    this.scene.start('GameScene')
  }
}