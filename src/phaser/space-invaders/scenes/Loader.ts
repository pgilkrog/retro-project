import { Scene } from 'phaser'
import alien from '../assets/green.png'
import player from '../assets/player.png'
import bullet from '../assets/projectile.png'

export default class Loader extends Scene {
  constructor() {
    super({ key: 'Loader' })
  }

  preload() {
    this.load.image('alien', alien)
    this.load.image('player', player)
    this.load.image('bullet', bullet)
  }

  create() {
    this.scene.start('Game')
  }
}