import type Phaser from 'phaser'
import { TileSets } from '../interfaces/enums'

export default class Tilesets {
  private tilesets: Record<string, Phaser.Tilemaps.Tileset> = {}

  constructor(map: Phaser.Tilemaps.Tilemap) {
    const tilesets_bricks = map.addTilesetImage('bricks', 'bricks', 32, 32)
    const tilesets_terrain = map.addTilesetImage('terrain-v7', 'terrain', 32, 32)
    const tilesets_vic_access = map.addTilesetImage(
      'victorian-accessories',
      'vicAccessories',
      32,
      32
    )
    const tilesets_vic_garden = map.addTilesetImage('victorian-garden', 'vicGarden', 32, 32)
    const tilesets_vic_mansion = map.addTilesetImage('victorian-mansion', 'vicMansion', 32, 32)
    const tilesets_vic_market = map.addTilesetImage('victorian-market', 'vicMarket', 32, 32)
    const tilesets_vic_streets = map.addTilesetImage('victorian-streets', 'vicStreets', 32, 32)
    const tilesets_vic_tenement = map.addTilesetImage('victorian-tenement', 'vicTenement', 32, 32)
    const tilesets_vic_win_doors = map.addTilesetImage(
      'victorian-windows-doors',
      'vicWindowsDoors',
      32,
      32
    )
    const tilesets_vic_walls = map.addTilesetImage('walls', 'vicWalls', 32, 32)
    const tilesets_vic_floors = map.addTilesetImage('floors', 'vicFloors', 32, 32)

    if (tilesets_bricks) this.tilesets[TileSets.bricks] = tilesets_bricks
    if (tilesets_terrain) this.tilesets[TileSets.terrain] = tilesets_terrain
    if (tilesets_vic_access) this.tilesets[TileSets.vicAccessories] = tilesets_vic_access
    if (tilesets_vic_garden) this.tilesets[TileSets.vicGarden] = tilesets_vic_garden
    if (tilesets_vic_mansion) this.tilesets[TileSets.vicMansion] = tilesets_vic_mansion
    if (tilesets_vic_market) this.tilesets[TileSets.vicMarket] = tilesets_vic_market
    if (tilesets_vic_streets) this.tilesets[TileSets.vicStreets] = tilesets_vic_streets
    if (tilesets_vic_tenement) this.tilesets[TileSets.vicTenement] = tilesets_vic_tenement
    if (tilesets_vic_win_doors) this.tilesets[TileSets.vicWindowsDoors] = tilesets_vic_win_doors
    if (tilesets_vic_walls) this.tilesets[TileSets.vicWalls] = tilesets_vic_walls
    if (tilesets_vic_floors) this.tilesets[TileSets.vicFloors] = tilesets_vic_floors
  }

  getTilesets(): Record<string, Phaser.Tilemaps.Tileset> {
    return this.tilesets
  }
}
