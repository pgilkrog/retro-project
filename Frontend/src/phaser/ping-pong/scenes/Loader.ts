import { Scene } from 'phaser'
import hitSound from '../assets/blip.mp3'
import pointUp from '../assets/powerup.mp3'

const api = import.meta.env.VITE_BASE_URL

export default class Loader extends Scene {

  constructor() {
    super({ key: 'Loader' })
  }

  preload() {
    this.load.image('ball', api + '/assets/pingpong/ball.png')
    this.load.image('paddle', api + '/assets/pingpong/paddle.png')

    // Sounds
    this.load.audio('hit-sound', hitSound)
    this.load.audio('point-up', pointUp)
  }

  create() {
    this.scene.start('GameScene')
  }
}