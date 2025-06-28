import { Scene } from 'phaser'
import cat1 from '../assets/FelineBombermanPixelArtSmall.png'
import walls from '../assets/walls.png'
import bomb from '../assets/bombSmall.png'
import map1 from '../assets/map1.json'
import menuImage from '../assets/menuImage.png'
import explosion from '../assets/explosion.png'
import cardBomb from '../assets/cardBombPlus.png'

const api = import.meta.env.VITE_BASE_URL + '/assets/spaceshooter/'

export default class Loader extends Scene {
  constructor() {
    super({ key: 'Loader' })
  }

  preload() {
    this.load.image('menuImage', menuImage)
    this.load.image('cat1', cat1)
    this.load.image('bomb', bomb)
    this.load.image('explosion', explosion)
    this.load.image('cardBomb', cardBomb)

    this.load.image('walls', walls)
    this.load.tilemapTiledJSON('map1', map1)
  }

  create() {
    this.scene.start('MainMenu')
  }
}
