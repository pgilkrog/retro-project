import { Scene } from 'phaser'
import sky from '@/phaser/flappy-disk/assets/sky.png'
import bird from '@/phaser/flappy-disk/assets/bird.png'
import pipe from '@/phaser/flappy-disk/assets/pipe.png'

export default class Loader extends Scene {
  constructor() {
    super({ key: 'Loader' })
  }

  preload() {
    this.load.image('sky', sky)    
    this.load.image('bird', bird)
    this.load.image('pipe', pipe)
  }

  create() {
    this.scene.start('Create')
  }
}