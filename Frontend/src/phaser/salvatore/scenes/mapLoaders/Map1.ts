import type Phaser from 'phaser'
import Tilesets from '../../utils/tilesets'
import { createRoundLight, createConeLight, nightOverlay } from './MapUtils/index'
import { TileSets } from '../../interfaces/enums'

type Layers = {
  objectLayer: Phaser.Tilemaps.ObjectLayer
  collideLayer: Phaser.Tilemaps.TilemapLayer
  groundLayer: Phaser.Tilemaps.TilemapLayer
  roadLayer: Phaser.Tilemaps.TilemapLayer
  brickLayer: Phaser.Tilemaps.TilemapLayer
  wallsLayer: Phaser.Tilemaps.TilemapLayer
  wallBuildingLayer: Phaser.Tilemaps.TilemapLayer
  buildingsLayer: Phaser.Tilemaps.TilemapLayer
  doorsLayer: Phaser.Tilemaps.TilemapLayer
  windowsLayer: Phaser.Tilemaps.TilemapLayer
  buildingDecosLayer: Phaser.Tilemaps.TilemapLayer
  walkPath: Phaser.Tilemaps.TilemapLayer
  drivePath: Phaser.Tilemaps.TilemapLayer
}

export default class Map1 {
  private scene: Phaser.Scene
  private layers!: Layers
  private lamps: Phaser.GameObjects.Group
  private tileSize: number = 0
  private map: any

  constructor(scene: Phaser.Scene) {
    this.scene = scene
    this.lamps = scene.add.group()

    this.map = this.scene.make.tilemap({ key: 'map1' })
    this.createLayers(this.map, new Tilesets(this.map).getTilesets())
  }

  private createLayers(
    map: Phaser.Tilemaps.Tilemap,
    tilesets: Record<string, Phaser.Tilemaps.Tileset>
  ) {
    const collideLayer = map.createLayer('Colliders', tilesets[TileSets.terrain])
    collideLayer?.setCollisionByProperty({ collides: true })

    const walkPath = map.createLayer('WalkPath', tilesets[TileSets.terrain])
    const groundLayer = map.createLayer('Ground', tilesets[TileSets.terrain])
    const roadLayer = map.createLayer('Road', tilesets[TileSets.bricks])
    const brickLayer = map.createLayer('Bricks', tilesets[TileSets.bricks])
    const wallsLayer = map.createLayer('Walls', tilesets[TileSets.vicAccessories])
    const buildingsLayer = map.createLayer('Buildings', tilesets[TileSets.vicTenement])
    const doorsLayer = map.createLayer('Decorations', [
      tilesets[TileSets.vicMarket],
      tilesets[TileSets.vicStreets],
    ])
    const windowsLayer = map.createLayer('WindowsDoors', tilesets[TileSets.vicWindowsDoors])
    const buildingDecosLayer = map.createLayer('BuildingDecos', [
      tilesets[TileSets.vicTenement],
      tilesets[TileSets.vicWindowsDoors],
      tilesets[TileSets.vicStreets],
    ])
    const wallBuildingLayer = map.createLayer('WallBuildings', tilesets[TileSets.vicTenement])
    const drivePath = map.createLayer('drivePath', tilesets[TileSets.terrain])

    this.tileSize = tilesets[TileSets.terrain].tileWidth
    const objectLayer = map.getObjectLayer('Objects')

    var texture = nightOverlay(this.scene, map, 'map1-nightoverlay')

    //Draw the street lamps
    objectLayer?.objects.forEach((objData: any) => {
      const { x = 0, y = 0, name = '' } = objData

      switch (name) {
        case 'light_street_lamp': {
          createRoundLight(texture, x, y, 60)
          break
        }
        case 'light_cone_lamp': {
          createConeLight(texture, x, y, 100)
          break
        }
        case 'street_lamp_1': {
          const lamp = this.scene.physics.add
            .sprite(x, y + 30, 'streetLamp1')
            .setDepth(y + 50)
            .setImmovable(true)
            .setSize(10, 10)
            .setOffset(6, 68)
          createRoundLight(texture, x, y, 100)
          this.lamps.add(lamp)
          break
        }
      }
    })

    wallBuildingLayer?.setDepth(800)

    texture?.refresh()

    this.layers = {
      objectLayer: objectLayer!,
      collideLayer: collideLayer!,
      groundLayer: groundLayer!,
      roadLayer: roadLayer!,
      brickLayer: brickLayer!,
      wallsLayer: wallsLayer!,
      wallBuildingLayer: wallBuildingLayer!,
      buildingsLayer: buildingsLayer!,
      doorsLayer: doorsLayer!,
      windowsLayer: windowsLayer!,
      buildingDecosLayer: buildingDecosLayer!,
      walkPath: walkPath!,
      drivePath: drivePath!,
    }
  }

  public getLayers() {
    return this.layers
  }

  public getLamps() {
    return this.lamps
  }

  public getTileSize() {
    return this.tileSize
  }

  public getWidthAndHeight() {
    return { height: this.map.height, width: this.map.width }
  }
}
