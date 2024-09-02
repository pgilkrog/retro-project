import { Scene } from 'phaser'
import lazer from '../assets/sounds/laser-104024.mp3'
import lazer2 from '../assets/sounds/laser-shot-ingame-230500.mp3'
import jump from '../assets/sounds/jump_c_02-102843.mp3'
import selectSound from '../assets/sounds/select-sound-121244.mp3'

const api = import.meta.env.VITE_BASE_URL + '/assets/spaceshooter/'

export default class Loader extends Scene {
  constructor() {
    super({ key: 'Loader' })
  }

  preload() {
    this.load.image('green', api + 'green.png')
    this.load.image('red', api + 'red.png')
    this.load.image('yellow', api + 'yellow.png')
    this.load.image('player', api + 'player.png')
    this.load.image('bullet', api + 'projectile.png')
    this.load.image('space-art', api + 'stars-bg.jpg')
    this.load.image('barrier', api + 'barrier.png')

    this.load.audio('lazershot', lazer)
    this.load.audio('lazershot2', lazer2)
    this.load.audio('jump', jump)
    this.load.audio('selectSound', selectSound)
  }

  create() {
    this.scene.start('Game')
  }
}