import Phaser, { GameObjects, Physics, Scene } from 'phaser'
import Player from '../entities/Player/Player'
import NPC from '../entities/NPC'
import Car from '../objects/Car'
import Door from '../objects/Door'
import Map1 from './mapLoaders/Map1'
import * as EasyStar from 'easystarjs'
import { AudioManager } from '../utils/AudioManager'

export default class Game extends Scene {
  private config: any
  private player!: any
  private npcs: Phaser.Physics.Arcade.Sprite[] = []
  private door!: any
  private cars: any[] = []
  private map: any
  private easystar!: any
  private audiomanager!: AudioManager

  constructor(config: any) {
    super({ key: 'Game' })
    this.config = config
    this.easystar = new EasyStar.js()
  }

  create() {
    // MAP 
    this.map = new Map1(this)
    this.audiomanager = new AudioManager(this)
    this.audiomanager.create()
    this.map.getLayers().objectLayer.objects.forEach((objData: any) => {
      const { x = 0, y = 0, name = "", width = 0, height = 0 } = objData

      switch (name) {
        case 'player_spawn': {
          this.player = new Player(this, x, y, this.map)
          this.player.setDepth(45)
          break
        }

        case 'npc_spawn': {
          this.npcs.push(new NPC(this, x, y))
          break
        }

        case 'door_apartment_1': {
          const test = new Door(this, x, y)
          this.door = { door: test , cords: {x: x, y: y}}
          break
        }

        case 'car_1': {
          this.cars.push(new Car(this, x, y))
        }
      }
      
    })

    // this.cameras.main.startFollow(this.player, true)
    this.physics.add.collider(this.player, this.map.getLayers().collideLayer)
    this.physics.add.collider(this.player, this.npcs)
    this.physics.add.collider(this.player, this.map.getLamps())
    this.physics.add.collider(this.player, this.cars)
    this.setupFollowupCameraOn(this.player)

    this.easyStarInit()

    this.input.on('pointerdown', (pointer: any, gameObject: any) => {
      if (pointer.leftButtonDown()) {
        console.log('Left clicked on object.', gameObject)
        if (gameObject[0] === this.door.door.zone) {
          const distance = Phaser.Math.Distance.BetweenPointsSquared(
            { x: this.player.x, y: this.player.y}, 
            { x: this.door.cords.x, y: this.door.cords.y }
          )
          if (distance < 500)
            this.scene.start('Apartment1')
        } 
        else {
          // NEEDS REWORK, find a way to not loop through all cars
          for (let i = 0; i < this.cars.length; i++) {
            if(gameObject[0] === this.cars[i]) {
              this.handleCarInteraction(gameObject[0])
              break              
            }
          }
        }      
      }
      if (pointer.rightButtonDown())
        console.log('Right clicked on object.', gameObject)
    })
    // this.audiomanager.playMusic('theme')
  }

  update = () => {
    this.player.setDepth(this.player.y)
  }
  
  setupFollowupCameraOn(player: Phaser.Physics.Arcade.Sprite) {
    const { height, width, mapOffset, zoomFactor } = this.config
    
    this.physics.world.setBounds(0, 0, width + mapOffset, height + 200)
    this.cameras.main.setBounds(0, 0, width + mapOffset, height).setZoom(zoomFactor)
    this.cameras.main.startFollow(player)
    this.cameras.main.setZoom(2)
    this.cameras.main.setRoundPixels(true)
  }

  handleCarInteraction(car: any) {
    if (!this.player.inCar) {
      this.setupFollowupCameraOn(car)
      // enter the car
      car.hasPlayerIn = true
      this.player.inCar = true
      this.player.disableBody(true, true)
      this.player.setPosition(-16, -16)
    } else {
      this.setupFollowupCameraOn(this.player)
      // exit the car
      car.hasPlayerIn = false
      this.player.inCar = false
      this.player.enableBody(true, car.x, car.y - 30, true, true)
    }
  }

  easyStarInit() {
    const collideLayer = this.map.getLayers().walkPath.layer.data;
    const grid: any[] = []

    // Loop through all tiles in the layer
    collideLayer.forEach((row: any) => {
      const rowData: any[] = []
      row.forEach((tile: any) => {
        // Check if tile is walkable or not
        const isWalkable = tile.properties ? tile.properties.cost : -1
        rowData.push(isWalkable === undefined ? -1 : isWalkable)
        // Set tile cost accordingly
        this.easystar.setTileCost(tile.x, tile.y, isWalkable)
      })
      grid.push(rowData)
    })
    this.easystar.setAcceptableTiles([1, 2, 3])
    this.easystar.setGrid(grid)
    
    this.time.addEvent({ delay: 500, callback: this.updatePaths, callbackScope: this, loop: true })
  }
  
 private npcDestinations: any[] = []

  updatePaths() {
    this.npcs.forEach((npc: any, index: number) => { 
      // if there is no destination or if the NPC has reached its destination
      if (npc.isFollowingPath === false) {
        console.log("dont call this all the time")
        const startX = Math.floor(npc.x / this.map.getTileSize())
        const startY = Math.floor(npc.y / this.map.getTileSize())
  
        // generate a random destination within the map
        const endX = Math.floor(Math.random() * this.map.getWidthAndHeight().width)
        const endY = Math.floor(Math.random() * this.map.getWidthAndHeight().height)
  
        this.easystar.calculate()
        if (startX !== endX || startY !== endY) {
          console.log(startX, startY, endX, endY)
          this.easystar.findPath(startX, startY, endX, endY, (path: any) => {
            console.log("PATH", path)
            if (path) {
              npc.isFollowingPath = true
              const worldPath = path.map((p: any) => ({ x: p.x * this.map.getTileSize(), y: p.y * this.map.getTileSize() }))
  
              // set the NPC's destination to the end of the path
              this.npcDestinations[index] = worldPath[worldPath.length - 1]
  
              // start the NPC's walk animation along the path
              npc.startWalkAnimation(worldPath, 50)
            }
          })
        }          
      }
    })
  }
}