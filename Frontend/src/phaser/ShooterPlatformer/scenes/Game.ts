import Phaser from 'phaser'
import PlayerController from './entities/player/PlayerController'
import { debugDraw } from '@/phaser/utils/debug'

export default class Game extends Phaser.Scene {
  private player: PlayerController | undefined

  constructor() {
    super({ key: 'PlayScene' })
  }

  create() {
    const map = this.make.tilemap({ key: 'testMap' })
    const tileset = map.addTilesetImage('Tileset', 'tiles')
    const tilesetCollider = map.addTilesetImage('colliderImg', 'collide')

    if (tileset != undefined) {
      const collideLayer = map.createLayer('Collider', tilesetCollider!)
      collideLayer?.setCollisionByProperty({ Collide: true })
      this.matter.world.convertTilemapLayer(collideLayer!)
      debugDraw(collideLayer!, this)
      map.createLayer('Floor', tileset)
    }

    this.player = new PlayerController(this)
  }

  update(t: number, dt: number) {
    this.player?.update(dt)
  }
}
