import { Scene } from 'phaser'

import playerPNG from '@/phaser/la-cosa-nostra/assets/player/texture.png'
import playerJSON from '@/phaser/la-cosa-nostra/assets/player/texture.json'

import walls from '@/phaser/la-cosa-nostra/assets/maps/tilesheets/walls.png'
import floors from '@/phaser/la-cosa-nostra/assets/maps/tilesheets/floors.png'
import collider from '@/phaser/la-cosa-nostra/assets/maps/tilesheets/colliderImg.png'
import testMap from '@/phaser/la-cosa-nostra/assets/maps/TestMap.json'
import doorImg from '@/phaser/la-cosa-nostra/assets/door.png'

import char from '@/phaser/la-cosa-nostra/assets/Gangster1Small.png'

import ball from '@/phaser/la-cosa-nostra/assets/reticle.png'

export default class Loader extends Scene {
  constructor() {
    super({ key: 'Loader' })
  }

  preload() {
    this.load.image('floors', floors)
    this.load.image('walls', walls)
    this.load.image('collider', collider)
    this.load.tilemapTiledJSON('testMap', testMap)
    this.load.atlas('player', playerPNG, playerJSON)
    this.load.image('char', char)
    this.load.image('ball', ball)
    this.load.image('doorImg', doorImg)
  }

  create() {
    this.scene.start('Game')
  }
}