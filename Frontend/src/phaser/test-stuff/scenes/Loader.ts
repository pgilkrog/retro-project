import { Scene } from 'phaser'
import ball from '@/phaser/test-stuff/assets/ball.png'
import paddle from '@/phaser/test-stuff/assets/paddle.png'
import hitSound from '@/phaser/test-stuff/assets/blip.mp3'
import pointUp from '@/phaser/test-stuff/assets/powerup.mp3'
import bigBox from '@/phaser/test-stuff/assets/bigBox.png'
import largeBox from '@/phaser/test-stuff/assets/2x4Box.png'
import bread from '@/phaser/test-stuff/assets/BreadSmall.png'
export default class Loader extends Scene {
  constructor() {
    super({ key: 'Loader' })
  }

  preload() {
    this.load.image('bigBox', bigBox)
    this.load.image('ball', ball)
    this.load.image('paddle', paddle)
    this.load.image('largeBox', largeBox)
    this.load.image('bread', bread)

    // Sounds
    this.load.audio('hit-sound', hitSound)
    this.load.audio('point-up', pointUp)
  }

  create() {
    this.scene.start('GameScene')
  }
}