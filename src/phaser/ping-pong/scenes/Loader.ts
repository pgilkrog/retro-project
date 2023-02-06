import { Scene } from 'phaser'
import ball from '@/phaser/ping-pong/assets/ball.png'
import paddle from '@/phaser/ping-pong/assets/paddle.png'
import hitSound from '@/phaser/ping-pong/assets/blip.mp3'
import pointUp from '@/phaser/ping-pong/assets/powerup.mp3'

export default class Loader extends Scene {
  constructor() {
    super({ key: 'Loader' })
  }

  preload() {
    this.load.image('ball', ball)
    this.load.image('paddle', paddle)

    // Sounds
    this.load.audio('hit-sound', hitSound)
    this.load.audio('point-up', pointUp)
  }

  create() {
    this.scene.start('GameScene')
  }
}