import type Phaser from 'phaser'
import * as EasyStar from 'easystarjs'

const easystar = new EasyStar.js()
const npcDestinations: any[] = []

const easyStarInit = (layer: any, entities: any, scene: Phaser.Scene, map: any) => {
  // Convert tilemap to a walkable grid
  const grid: number[][] = []

  for (let y = 0; y < layer.height; y++) {
    grid[y] = []
    for (let x = 0; x < layer.width; x++) {
      const tile = layer.getTileAt(x, y)
      grid[y][x] = tile && tile.index !== -1 ? 0 : 1 // 0 = walkable, 1 = non-walkable
    }
  }

  easystar.setGrid(grid)
  easystar.setAcceptableTiles([1, 2, 3, 4, 5, 6, 7, 8]) // Walkable tiles
}
export default easyStarInit
