import type Phaser from 'phaser'
import Tilesets from '../../utils/tilesets'
import { nightOverlay } from './MapUtils/index'

export default class Apartment1 {
  private scene: Phaser.Scene
  private layers: any

  constructor(scene: Phaser.Scene) {
    this.scene = scene

    const map = this.scene.make.tilemap({ key: 'apartment_1' })
    this.createLayers(map, new Tilesets(map).getTilesets())
  }

  private createLayers(map: Phaser.Tilemaps.Tilemap, tilesets: Phaser.Tilemaps.Tileset[]) {
  
    const groundLayer = map.createLayer('Ground', tilesets[10])
    const objectLayer = map.getObjectLayer('Objects')
    const wallsLayer = map.createLayer('Walls', tilesets[9])
    wallsLayer.setCollisionByProperty({ collides: true }) 

    var texture = nightOverlay(this.scene, map, 'apartment-night-overlay')

    texture.refresh()
    
    this.layers = {
      objectLayer: objectLayer,
      groundLayer: groundLayer, 
      wallsLayer: wallsLayer, 
    }
  }

  public getLayers() {
    return this.layers
  }
}