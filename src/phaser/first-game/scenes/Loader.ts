import { Scene } from 'phaser'
import sky from '@/phaser/first-game/assets/sky.png'
import bomb from '@/phaser/first-game/assets/bomb.png'
import thudMp3 from '@/phaser/first-game/assets/thud.mp3'
import dude from '@/phaser/first-game/assets/dude.png'

import tiles from '@/phaser/first-game/assets/Tiles.png'
import map1 from '@/phaser/first-game/assets/map1.json'

import playerJson from '@/phaser/first-game/assets/Knight/texture.json'
import playerPNG from '@/phaser/first-game/assets/Knight/texture.png'

export default class Loader extends Scene {
  constructor () {
    super({ key: 'BootScene' })
  }

  preload () {
    this.load.image('sky', sky)
    this.load.image('bomb', bomb)
    this.load.image('dude', dude)

    this.load.image('tiles', tiles)
    this.load.tilemapTiledJSON('map1', map1)

    this.load.atlas('character', playerPNG, playerJson)

    this.load.audio('thud', [thudMp3])
  }

  create () {
    console.log("LOADER SCENE")
    this.scene.start('PlayScene')
  }
}
