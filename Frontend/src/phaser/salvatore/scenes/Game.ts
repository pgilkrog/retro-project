import Phaser, { GameObjects, Physics, Scene } from 'phaser'
import Player from '../entities/Player/Player'
import NPC from '../entities/NPC'
import Car from '../objects/Car'
import Door from '../objects/Door'
import Map1 from './mapLoaders/Map1'
import { AudioManager } from '../utils/AudioManager'
import easyStarInit from '../utils/pathfinding/EasyStar'
import type { IConfig } from '../interfaces/IConfig'

export default class Game extends Scene {
  private config: IConfig
  private player: Player | undefined
  private npcs: NPC[] = []
  private door!: any
  private cars: any[] = []
  private map: any
  private audiomanager!: AudioManager

  constructor(config: IConfig) {
    super({ key: 'Game' })
    this.config = config
  }

  create() {
    this.map = new Map1(this)
    this.audiomanager = new AudioManager(this)
    this.audiomanager.create()

    this.map.getLayers().objectLayer.objects.forEach((objData: any) => {
      const { x = 0, y = 0, name = '' } = objData

      switch (name) {
        case 'player_spawn': {
          this.player = new Player(this, x, y)
          break
        }

        case 'npc_spawn': {
          this.npcs.push(new NPC(this, x, y, 'npc-' + (this.npcs.length + 1)))
          break
        }

        case 'door_apartment_1': {
          this.door = new Door(this, x, y)
          break
        }

        case 'car_1': {
          this.cars.push(new Car(this, x, y))
          break
        }
      }
    })

    this.physics.world.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels)

    if (this.player != undefined) {
      this.physics.add.collider(this.player, this.map.getLayers().collideLayer)
      this.physics.add.collider(this.npcs, this.map.getLayers().collideLayer)
      this.physics.add.collider(this.player, this.npcs)
      this.physics.add.collider(this.player, this.map.getLamps())
      this.physics.add.collider(this.player, this.cars)
      this.setupFollowupCameraOn(this.player)
    }

    easyStarInit(this.map.getLayers().walkPath.layer.data, this.npcs, this, this.map)

    this.input.on('pointerdown', (pointer: any, gameObject: any) => {
      if (pointer.leftButtonDown()) {
        console.log('Left clicked on object.', gameObject)
        if (gameObject[0] === this.door.zone) {
          const distance = Phaser.Math.Distance.BetweenPointsSquared(
            { x: this.player?.x ?? 0, y: this.player?.y ?? 0 },
            this.door.getCords()
          )
          if (distance < 500) {
            this.scene.start('Apartment1')
          }
        } else {
          // NEEDS REWORK, find a way to not loop through all cars
          for (let i = 0; i < this.cars.length; i++) {
            if (gameObject[0] === this.cars[i]) {
              this.handleCarInteraction(gameObject[0])
              break
            }
          }
        }
      }
      if (pointer.rightButtonDown()) console.log('Right clicked on object.', gameObject)
    })
    // this.audiomanager.playMusic('theme')

    this.scene.launch('UIScene', { character: this.player })
  }

  update = () => {
    this.player?.setDepth(this.player.y)
  }

  setupFollowupCameraOn(player: Phaser.Physics.Arcade.Sprite) {
    const { height, width, mapOffset, zoomFactor } = this.config

    this.physics.world.setBounds(0, 0, width + mapOffset, height + 200)
    this.cameras.main.setBounds(0, 0, width + mapOffset, height).setZoom(zoomFactor)
    this.cameras.main.startFollow(player)
    this.cameras.main.setZoom(2)
    this.cameras.main.setRoundPixels(true)
  }

  handleCarInteraction = (car: any) => {
    if (this.player?.inCar === false) {
      this.setupFollowupCameraOn(car)
      // enter the car
      car.hasPlayerIn = true
      this.player.inCar = true
      this.player.disableBody(true, true)
      this.player.setPosition(-16, -16)
    } else if (this.player != undefined) {
      this.setupFollowupCameraOn(this.player)
      // exit the car
      car.hasPlayerIn = false
      this.player.inCar = false
      this.player.enableBody(true, car.x, car.y - 30, true, true)
    }
  }

  destroy() {
    this.scene.stop('UIScene')
  }
}
