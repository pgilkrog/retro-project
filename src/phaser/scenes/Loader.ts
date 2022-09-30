import { Scene } from 'phaser'
import sky from '@/phaser/assets/sky.png'
import bomb from '@/phaser/assets/bomb.png'
import thudMp3 from '@/phaser/assets/thud.mp3'
import dude from '@/phaser/assets/dude.png'

export default class Loader extends Scene {
  constructor () {
    super({ key: 'BootScene' })
  }

  preload () {
    this.load.image('sky', sky)
    this.load.image('bomb', bomb)
    this.load.image('dude', dude)

    this.load.audio('thud', [thudMp3])
  }

  create () {
    console.log("LOADER SCENE")
    this.scene.start('PlayScene')
  }
}
