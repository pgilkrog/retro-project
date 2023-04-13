import Phaser, { Physics, Scene } from 'phaser'
import Player from '../entities/Player'
import NPC from '../entities/NPC'
import Door from '../objects/Door'
import Map1 from './mapLoaders/Map1'

export default class Game extends Scene {
  private config: any
  private player!: Phaser.Physics.Arcade.Sprite
  private npcs: Phaser.Physics.Arcade.Sprite[] = []
  private door!: any

  constructor(config: any) {
    super({ key: 'Game' })
    this.config = config
  }

  create() {
    // MAP 
    const map = new Map1(this)

    map.getLayers().objectLayer.objects.forEach((objData: any) => {
      const { x = 0, y = 0, name = "", width = 0, height = 0 } = objData

      switch (name) {
        case 'player_spawn': {
          this.player = new Player(this, x, y, map)
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
      }
    })

    // map.getLayers().Decorations.setDepth(someDecortion.deph -1, this.player)

    // this.cameras.main.startFollow(this.player, true)
    this.physics.add.collider(this.player, map.getLayers().collideLayer)
    this.physics.add.collider(this.player, this.npcs)
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
      }
      if (pointer.rightButtonDown())
        console.log('Right clicked on object.', gameObject)
    })
  }

  update() {

  }
  
  setupFollowupCameraOn(player: Phaser.Physics.Arcade.Sprite) {
    const { height, width, mapOffset, zoomFactor } = this.config
    this.physics.world.setBounds(0, 0, width + mapOffset, height + 200)
    this.cameras.main.setBounds(0, 0, width + mapOffset, height).setZoom(zoomFactor)
    this.cameras.main.startFollow(player)
    this.cameras.main.setZoom(2)
    this.cameras.main.setRoundPixels(true)
  }
}