import { Scene } from 'phaser'

import player from '../assets/Characters/Player/playersheet.png'
import playerJson from '../assets/Characters/Player/playersheet.json'
import npc from '../assets/mage-idle-1.png'
import lamp1 from '../assets/objects/lamp_1.png'

import bricks from '../assets/maps/tilesheets/bricks.png'
import terrain from '../assets/maps/tilesheets/terrain-v7.png'
import vicAccessories from '../assets/maps/tilesheets/victorian-accessories.png'
import vicGarden from '../assets/maps/tilesheets/victorian-garden.png'
import vicMansion from '../assets/maps/tilesheets/victorian-mansion.png'
import vicMarket from '../assets/maps/tilesheets/victorian-market.png'
import vicStreets from '../assets/maps/tilesheets/victorian-streets.png'
import vicTenement from '../assets/maps/tilesheets/victorian-tenement.png'
import vicWindowsDoors from '../assets/maps/tilesheets/victorian-windows-doors.png'
import vicWalls from '../assets/maps/tilesheets/walls.png'
import vicFloors from '../assets/maps/tilesheets/floors.png'

import map1 from '../assets/maps/Map1.json'
import apartment1 from '../assets/maps/Apartment1.json'

export default class Loader extends Scene {
  constructor() {
    super({ key: 'Loader' })
  }

  preload() {
    // Load tilesets png's
    this.load.image('bricks', bricks)
    this.load.image('terrain', terrain)
    this.load.image('vicAccessories', vicAccessories)
    this.load.image('vicGarden', vicGarden)
    this.load.image('vicMansion', vicMansion)
    this.load.image('vicMarket', vicMarket)
    this.load.image('vicStreets', vicStreets)
    this.load.image('vicTenement', vicTenement)
    this.load.image('vicWindowsDoors', vicWindowsDoors)
    this.load.image('vicWalls', vicWalls)
    this.load.image('vicFloors', vicFloors)

    // Load map json's
    this.load.tilemapTiledJSON('map1', map1)
    this.load.tilemapTiledJSON('apartment_1', apartment1)

    // Load other
    this.load.atlas('player', player, playerJson)
    this.load.image('npc', npc)
    this.load.image('streetLamp1', lamp1)
  }

  create() {
    this.scene.start('Game')
  }
}