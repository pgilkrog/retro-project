import Phaser, { GameObjects, Physics, Scene } from 'phaser'
import Player from '../entities/Player/Player'
import NPC from '../entities/NPC'
import Car from '../objects/Car'
import Door from '../objects/Door'
import Map1 from './mapLoaders/Map1'

export default class Game extends Scene {
  private config: any
  private player!: any
  private npcs: Phaser.Physics.Arcade.Sprite[] = []
  private door!: any
  private cars: any[] = []
  private map: any

  constructor(config: any) {
    super({ key: 'Game' })
    this.config = config
  }

  create() {
    // MAP 
    this.map = new Map1(this)

    this.map.getLayers().objectLayer.objects.forEach((objData: any) => {
      const { x = 0, y = 0, name = "", width = 0, height = 0 } = objData

      switch (name) {
        case 'player_spawn': {
          this.player = new Player(this, x, y, this.map)
          this.player.setDepth(45)
          console.log("is player in car?", this.player.inCar)
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
  }

  update() {
    this.player.setDepth(this.player.y)

    // if (this.player.y > this.map.getLayers().buildingsLayer.y) {
    //   this.map.getLayers().buildingsLayer.alpha = 0.5;
    // } else {
    //   this.map.getLayers().buildingsLayer.alpha = 1;
    // }
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
}