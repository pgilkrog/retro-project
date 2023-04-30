import { Scene } from 'phaser'
import sky from '@/phaser/flappy-disk/assets/sky.png'
import bird from '@/phaser/flappy-disk/assets/bird.png'
import pipe from '@/phaser/flappy-disk/assets/pipe.png'
import pause from '@/phaser/flappy-disk/assets/pause.png'
import back from '@/phaser/flappy-disk/assets/back.png'

export default class Loader extends Scene {
  constructor() {
    super({ key: 'Loader' })
  }

  preload() {
    this.load.image('sky', sky)    
    this.load.image('bird', bird)
    this.load.image('pipe', pipe)
    this.load.image('pause', pause)
    this.load.image('backButton', back)
  }

  create() {
    this.scene.start('Menu')
  }
} 