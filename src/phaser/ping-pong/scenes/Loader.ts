import { Scene } from 'phaser'
import ball from '@/phaser/ping-pong/assets/ball.png'
import paddle from '@/phaser/ping-pong/assets/paddle.png'
import hitSound from '@/phaser/ping-pong/assets/blip.mp3'

export default class Loader extends Scene {
  constructor() {
    super({ key: 'Loader' })
  }

  preload() {
    this.load.image('ball', ball)
    this.load.image('paddle', paddle)
    this.load.audio('hit-sound', hitSound)
  }

  create() {
    this.scene.start('GameScene')
  }
}