import Phaser from 'phaser'
import Player from '../entities/Player'

export default class PlayScene extends Phaser.Scene {
  private player!: Phaser.Physics.Arcade.Sprite


  constructor() {
    super('PlayScene')
  }

  create() {
    const map = this.createMap()
    const layers = this.createLayers(map) 
    this.player = this.createPlayer()

    this.physics.add.collider(this.player, layers.platformsColliders)
  }

  createPlayer() {
    return new Player(this, 200, 250)
  }

  createMap() {
    const map = this.make.tilemap({ key: 'map' })
    map.addTilesetImage('main_lev_build_1', 'tiles-1')
    
    return map
  }

  createLayers(map: any) {
    const tileset = map.getTileset('main_lev_build_1')
    const platformsColliders = map.createLayer('platforms_colliders', tileset)
    const environment = map.createLayer('environment', tileset)
    const platforms = map.createLayer('platforms', tileset)

    platformsColliders.setCollisionByProperty({ collides: true })
    
    return {environment, platforms, platformsColliders}
  }
}