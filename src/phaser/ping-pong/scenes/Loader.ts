import { Scene } from 'phaser'

import ball from '@/phaser/ping-pong/assets/ball.png'
import paddle from '@/phaser/ping-pong/assets/paddle.png'

export default class Loader extends Scene {
  constructor() {
    super({ key: 'Loader' })
  }

  preload() {
    this.load.image('ball', ball)
    this.load.image('paddle', paddle)
  }

  create() {
    this.scene.start('GameScene')
  }
}