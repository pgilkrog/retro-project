import type Phaser from 'phaser'

export default class Tilesets {
  private tilesets: Phaser.Tilemaps.Tileset[]

  constructor(map: Phaser.Tilemaps.Tilemap) {
    const tilesets_bricks = map.addTilesetImage('bricks', 'bricks', 32, 32)
    const tilesets_terrain = map.addTilesetImage('terrain-v7', 'terrain', 32, 32)
    const tilesets_vic_access = map.addTilesetImage('victorian-accessories', 'vicAccessories', 32, 32)
    const tilesets_vic_garden = map.addTilesetImage('victorian-garden', 'vicGarden', 32, 32)
    const tilesets_vic_mansion = map.addTilesetImage('victorian-mansion', 'vicMansion', 32, 32)
    const tilesets_vic_market = map.addTilesetImage('victorian-market', 'vicMarket', 32, 32)
    const tilesets_vic_streets = map.addTilesetImage('victorian-streets', 'vicStreets', 32, 32)
    const tilesets_vic_tenement = map.addTilesetImage('victorian-tenement', 'vicTenement', 32, 32)
    const tilesets_vic_win_doors = map.addTilesetImage('victorian-windows-doors', 'vicWindowsDoors', 32, 32)
    const tilesets_vic_walls = map.addTilesetImage('walls', 'vicWalls', 32, 32)
    const tilesets_vic_floors = map.addTilesetImage('floors', 'vicFloors', 32, 32)

    this.tilesets = [
      tilesets_bricks!,          // 0
      tilesets_terrain!,         // 1
      tilesets_vic_access!,      // 2
      tilesets_vic_garden!,      // 3
      tilesets_vic_mansion!,     // 4
      tilesets_vic_market!,      // 5
      tilesets_vic_streets!,     // 6
      tilesets_vic_tenement!,    // 7
      tilesets_vic_win_doors!,   // 8
      tilesets_vic_walls!,       // 9
      tilesets_vic_floors!       // 10
    ]
  }

  getTilesets(): Phaser.Tilemaps.Tileset[] {
    return this.tilesets
  }
}