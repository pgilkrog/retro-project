import { Scene } from 'phaser'

import player from '../assets/rogue-idle-1.png'
import npc from '../assets/mage-idle-1.png'

import bricks from '../assets/maps/bricks.png'
import terrain from '../assets/maps/terrain-v7.png'
import vicAccessories from '../assets/maps/victorian-accessories.png'
import vicGarden from '../assets/maps/victorian-garden.png'
import vicMansion from '../assets/maps/victorian-mansion.png'
import vicMarket from '../assets/maps/victorian-market.png'
import vicStreets from '../assets/maps/victorian-streets.png'
import vicTenement from '../assets/maps/victorian-tenement.png'
import vicWindowsDoors from '../assets/maps/victorian-windows-doors.png'
import map1 from '../assets/maps/Map1.json'

export default class Loader extends Scene {
  constructor() {
    super({ key: 'Loader' })
  }

  preload() {
    this.load.image('bricks', bricks)
    this.load.image('terrain', terrain)
    this.load.image('vicAccessories', vicAccessories)
    this.load.image('vicGarden', vicGarden)
    this.load.image('vicMansion', vicMansion)
    this.load.image('vicMarket', vicMarket)
    this.load.image('vicStreets', vicStreets)
    this.load.image('vicTenement', vicTenement)
    this.load.image('vicWindowsDoors', vicWindowsDoors)
    this.load.tilemapTiledJSON('map1', map1)

    this.load.image('player', player)
    this.load.image('npc', npc)
  }

  create() {
    this.scene.start('Game')
  }
}