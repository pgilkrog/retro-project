import Phaser, { Physics, Scene } from 'phaser'
import Player from '../entities/Player'
import NPC from '../entities/NPC'
import MapLoader from './MapLoader'

export default class Game extends Scene {
  private config: any
  private player!: Phaser.Physics.Arcade.Sprite
  private npcs: Phaser.Physics.Arcade.Sprite[] = []

  constructor(config: any) {
    super({ key: 'Game' })
    this.config = config
  }

  create() {
    // MAP 
    const map = new MapLoader(this)

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
      }
    })

    
    // this.cameras.main.startFollow(this.player, true)
    this.physics.add.collider(this.player, map.getLayers().collideLayer)
    this.setupFollowupCameraOn(this.player)
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