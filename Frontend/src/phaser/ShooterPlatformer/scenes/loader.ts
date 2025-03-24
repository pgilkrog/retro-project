import { Scene } from 'phaser'

import playerJson from '@/phaser/ShooterPlatformer/assets/player/texture.json'
import playerPNG from '@/phaser/ShooterPlatformer/assets/player/texture.png'

import enemy1Json from '@/phaser/ShooterPlatformer/assets/enemies/enemy1/texture.json'
import enemy1PNG from '@/phaser/ShooterPlatformer/assets/enemies/enemy1/texture.png'

import testMapJson from '@/phaser/ShooterPlatformer/assets/testmap/testmap.json'
import testMapTiles from '@/phaser/ShooterPlatformer/assets/testmap/Tileset.png'

import collideImg from '@/phaser/ShooterPlatformer/assets/testmap/colliderImg.png'

import bullet from '@/phaser/ShooterPlatformer/assets/reticle.png'

export default class Loader extends Scene {
  constructor() {
    super({ key: 'Loader' })
  }

  preload() {
    this.load.image('tiles', testMapTiles)
    this.load.image('collide', collideImg)
    this.load.tilemapTiledJSON('testMap', testMapJson)

    this.load.atlas('player', playerPNG, playerJson)
    this.load.atlas('enemy_fighter', enemy1PNG, enemy1Json)

    this.load.image('bullet', bullet)
  }

  create() {
    this.scene.start('PlayScene')
  }
}
