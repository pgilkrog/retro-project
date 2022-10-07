import { Scene } from 'phaser'

import thudMp3 from '@/phaser/first-game/assets/thud.mp3'
import heart from '@/phaser/first-game/assets/Heart.png'
import potionHealth from '@/phaser/first-game/assets/Potion-Health.png'

import tiles from '@/phaser/first-game/assets/Tiles.png'
import map1 from '@/phaser/first-game/assets/map1.json'

import playerJson from '@/phaser/first-game/assets/mage-player/texture.json'
import playerPNG from '@/phaser/first-game/assets/mage-player/texture.png'

import skeletonJson from '@/phaser/first-game/assets/mobs/skeleton.json'
import skeletonPNG from '@/phaser/first-game/assets/mobs/skeletonImg.png'

export default class Loader extends Scene {
  constructor() {
    super({ key: 'BootScene' })
  }

  preload() {
    this.load.image('tiles', tiles)
    this.load.tilemapTiledJSON('map1', map1)

    this.load.atlas('character', playerPNG, playerJson)
    this.load.atlas('mob-skeleton', skeletonPNG, skeletonJson)

    this.load.audio('thud', [thudMp3])
    this.load.image('heart', heart)
    this.load.image('potion-health', potionHealth)
  }

  create() {
    console.log("LOADER SCENE")
    this.scene.start('PlayScene')
  }
}
