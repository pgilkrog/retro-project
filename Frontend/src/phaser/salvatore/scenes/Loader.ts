import { Scene } from 'phaser'

import player from '../assets/Characters/Player/playersheet.png'
import playerJson from '../assets/Characters/Player/playersheet.json'
import npc from '../assets/Characters/Gangster1Small.png'
import npc2 from '../assets/Characters/Gangster2Small.png'
import npc3 from '../assets/Characters/Gangster3Small.png'
import npc4 from '../assets/Characters/Gangster4Small.png'

import lamp1 from '../assets/objects/lamp_1.png'
import blueCar from '../assets/objects/blue_car.png'
import luxuryCar from '../assets/objects/luxury-car/texture.png'
import luxuryCarJson from '../assets/objects/luxury-car/texture.json'

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
import musicTheme from '../assets/sounds/music/Closed_Curtains.mp3'
import inventoryUI from '../assets/ui/InventoryUI.png'
import apple from '../assets/objects/AppleSmall.png'
import bread from '../assets/objects/BreadSmall.png'

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
    this.load.image('npc-1', npc)
    this.load.image('npc-2', npc2)
    this.load.image('npc-3', npc3)
    this.load.image('npc-4', npc4)
    this.load.image('streetLamp1', lamp1)
    this.load.atlas('car', luxuryCar, luxuryCarJson)
    this.load.image('inventoryUI', inventoryUI)
    this.load.image('apple', apple)
    this.load.image('bread', bread)


    // Audio
    this.load.audio('theme', musicTheme)
  }

  create() {
    this.scene.start('Game')
  }
}