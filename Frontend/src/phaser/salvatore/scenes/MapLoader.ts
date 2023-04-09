import type Phaser from 'phaser'

export default class MapLoader {
  private scene: Phaser.Scene
  private layers: any

  constructor(scene: Phaser.Scene) {
    this.scene = scene

    const map = this.scene.make.tilemap({ key: 'map1' })
    const tilesets_bricks = map.addTilesetImage('bricks', 'bricks', 32, 32)
    const tilesets_terrain = map.addTilesetImage('terrain-v7', 'terrain', 32, 32)
    const tilesets_vic_access = map.addTilesetImage('victorian-accessories', 'vicAccessories', 32, 32)
    const tilesets_vic_garden = map.addTilesetImage('victorian-garden', 'vicGarden', 32, 32)
    const tilesets_vic_mansion = map.addTilesetImage('victorian-mansion', 'vicMansion', 32, 32)
    const tilesets_vic_market = map.addTilesetImage('victorian-market', 'vicMarket', 32, 32)
    const tilesets_vic_streets = map.addTilesetImage('victorian-streets', 'vicStreets', 32, 32)
    const tilesets_vic_tenement = map.addTilesetImage('victorian-tenement', 'vicTenement', 32, 32)
    const tilesets_vic_win_doors = map.addTilesetImage('victorian-windows-doors', 'vicWindowsDoors', 32, 32)
    
    const tilesets = [
      tilesets_bricks, 
      tilesets_terrain, 
      tilesets_vic_access, 
      tilesets_vic_garden, 
      tilesets_vic_mansion, 
      tilesets_vic_market,
      tilesets_vic_streets,
      tilesets_vic_tenement,
      tilesets_vic_win_doors
    ]
    
    this.createLayers(map, tilesets)
  }

  private createLayers(map: Phaser.Tilemaps.Tilemap, tilesets: Phaser.Tilemaps.Tileset[]) {
    const collideLayer = map.createLayer('Colliders', tilesets)
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