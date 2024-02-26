import { Scene } from 'phaser'

import playerPNG from '@/phaser/la-cosa-nostra/assets/player/texture.png'
import playerJSON from '@/phaser/la-cosa-nostra/assets/player/texture.json'

import map from '@/phaser/la-cosa-nostra/assets/Apartment2.json'
import tiles from '@/phaser/la-cosa-nostra/assets/walls.png'

import char from '@/phaser/la-cosa-nostra/assets/Gangster1Small.png'

import ball from '@/phaser/la-cosa-nostra/assets/ball.png'

export default class Loader extends Scene {
  constructor() {
    super({ key: 'Loader' })
  }

  preload() {
    this.load.image('tiles', tiles)
    this.load.tilemapTiledJSON('map', map)
    this.load.atlas('player-walk', playerPNG, playerJSON)
    this.load.image('char', char)
    this.load.image('ball', ball)
  }

  create() {
    this.scene.start('Game')
  }
}