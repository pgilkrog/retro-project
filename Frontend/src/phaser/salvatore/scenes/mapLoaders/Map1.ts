import type Phaser from 'phaser'
import Tilesets from '../../utils/tilesets'

export default class Map1 {
  private scene: Phaser.Scene
  private layers: any

  constructor(scene: Phaser.Scene) {
    this.scene = scene

    const map = this.scene.make.tilemap({ key: 'map1' })
    this.createLayers(map, new Tilesets(map).getTilesets())
  }

  private createLayers(map: Phaser.Tilemaps.Tilemap, tilesets: Phaser.Tilemaps.Tileset[]) {
    const collideLayer = map.createLayer('Colliders', tilesets[1])
    collideLayer.setCollisionByProperty({ collides: true }) 

    const groundLayer = map.createLayer('Ground', tilesets[1])
    const roadLayer = map.createLayer('Road', tilesets[0])
    const brickLayer = map.createLayer('Bricks', tilesets[0])
    const wallsLayer = map.createLayer('Walls', tilesets[2])
    const buildingsLayer = map.createLayer('Buildings', tilesets[7])
    const doorsLayer = map.createLayer('Doors', tilesets[8])
    const windowsLayer = map.createLayer('Windows', tilesets[8])
    const buildingDecosLayer = map.createLayer('BuildingDecos', [tilesets[7], tilesets[8], tilesets[6]])

    const objectLayer = map.getObjectLayer('Objects')
    
    this.layers = {
      objectLayer: objectLayer,
      collideLayer: collideLayer, 
      groundLayer: groundLayer, 
      roadLayer: roadLayer, 
      brickLayer: brickLayer, 
      wallsLayer: wallsLayer, 
      buildingsLayer: buildingsLayer, 
      doorsLayer: doorsLayer, 
      windowsLayer: windowsLayer, 
      buildingDecosLayer: buildingDecosLayer
    }
  }

  public getLayers() {
    return this.layers
  }
}