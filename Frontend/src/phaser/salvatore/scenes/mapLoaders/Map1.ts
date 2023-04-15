import type Phaser from 'phaser'
import Tilesets from '../../utils/tilesets'
import { createRoundLight, createConeLight, nightOverlay } from './MapUtils/index'

type Layers = {
  objectLayer: Phaser.Tilemaps.ObjectLayer
  collideLayer: Phaser.Tilemaps.TilemapLayer
  groundLayer: Phaser.Tilemaps.TilemapLayer
  roadLayer: Phaser.Tilemaps.TilemapLayer
  brickLayer: Phaser.Tilemaps.TilemapLayer
  wallsLayer: Phaser.Tilemaps.TilemapLayer
  buildingsLayer: Phaser.Tilemaps.TilemapLayer
  doorsLayer: Phaser.Tilemaps.TilemapLayer
  windowsLayer: Phaser.Tilemaps.TilemapLayer
  buildingDecosLayer: Phaser.Tilemaps.TilemapLayer
}

export default class Map1 {
  private scene: Phaser.Scene
  private layers!: Layers
  private lamps: Phaser.GameObjects.Group
  
  constructor(scene: Phaser.Scene) {
    this.scene = scene
    this.lamps = scene.add.group()
    
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
    const doorsLayer = map.createLayer('Decorations', [tilesets[5], tilesets[6]])
    const windowsLayer = map.createLayer('WindowsDoors', tilesets[8])
    const buildingDecosLayer = map.createLayer('BuildingDecos', [tilesets[7], tilesets[8], tilesets[6]])

    const objectLayer = map.getObjectLayer('Objects')

    var texture = nightOverlay(this.scene, map, 'map1-nightoverlay')

    //Draw the street lamps
    objectLayer.objects.forEach((objData: any) => {
      const { x = 0, y = 0, name = "", width = 0, height = 0 } = objData

      switch (name) {
        case 'light_street_lamp': {
          createRoundLight(texture, x, y, 100)
          break
        }
        case 'light_cone_lamp': {
          createConeLight(texture, x, y, 100)
          break
        }
        case 'street_lamp_1': {
          const lamp = this.scene.physics.add.sprite(x, y+30, 'streetLamp1').setDepth(y+50).setImmovable(true).setSize(10, 10).setOffset(6, 68)
          createRoundLight(texture, x, y, 100)
          this.lamps.add(lamp)
        }
      }
    })

    texture.refresh()
    
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

  public getLamps() {
    return this.lamps
  }
}