import { Scene } from 'phaser'
import cat1 from '../assets/player_cat_1.png'
import solidwall from '../assets/solidwall.png'
import bomb from '../assets/bomb.png'

const api = import.meta.env.VITE_BASE_URL + '/assets/spaceshooter/'

export default class Loader extends Scene {
  constructor() {
    super({ key: 'Loader' })
  }

  preload() {
    this.load.image('cat1', cat1)
    this.load.image('solidwall', solidwall)
    this.load.image('bomb', bomb)
  }

  create() {
    this.scene.start('Game')
  }
}
