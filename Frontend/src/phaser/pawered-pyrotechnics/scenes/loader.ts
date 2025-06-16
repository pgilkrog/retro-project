import { Scene } from 'phaser'
import cat1 from '../assets/player_cat_1.png'

const api = import.meta.env.VITE_BASE_URL + '/assets/spaceshooter/'

export default class Loader extends Scene {
  constructor() {
    super({ key: 'Loader' })
  }

  preload() {
    this.load.image('cat1', cat1)
  }

  create() {
    this.scene.start('Game')
  }
}
