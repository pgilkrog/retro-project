import type Phaser from 'phaser'
import * as EasyStar from 'easystarjs'

const easystar = new EasyStar.js()

const easyStarInit = (layer: any, entities: any, scene: Phaser.Scene, map: any) => {
  const grid: any[] = []

  // Loop through all tiles in the layer
  layer.forEach((row: any) => {
    const rowData: any[] = []
    row.forEach((tile: any) => {
      // Check if tile is walkable or not
      const isWalkable = tile.properties ? tile.properties.cost : -1
      rowData.push(isWalkable === undefined ? -1 : isWalkable)
      // Set tile cost accordingly
      // easystar.setTileCost(tile.x, tile.y, isWalkable)
    })
    grid.push(rowData)
  })
  easystar.setAcceptableTiles([1, 2, 3])
  easystar.setGrid(grid)
  
  scene.time.addEvent({ 
    delay: 500, 
    callback: () => updatePaths(entities, map), 
    callbackScope: this, 
    loop: true 
  })
}

const npcDestinations: any[] = []

const updatePaths = (array: any[], map: any) => {
  array.forEach((entity: any, index: number) => { 
    // if there is no destination or if the NPC has reached its destination
    if (entity.isFollowingPath === false) {
      const startX = Math.floor(entity.x / map.getTileSize())
      const startY = Math.floor(entity.y / map.getTileSize())

      // generate a random destination within the map
      const endX = Math.floor(Math.random() * map.getWidthAndHeight().width)
      const endY = Math.floor(Math.random() * map.getWidthAndHeight().height)

      easystar.calculate()
      if (startX !== endX || startY !== endY) {
        easystar.findPath(startX, startY, endX, endY, (path: any) => {
          if (path) {
            entity.isFollowingPath = true
            const worldPath = path.map((p: any) => ({ x: p.x * map.getTileSize(), y: p.y * map.getTileSize() }))

            // set the entity's destination to the end of the path
            npcDestinations[index] = worldPath[worldPath.length - 1]

            // start the entity's walk animation along the path
            entity.startWalkAnimation(worldPath, 50)
          }
        })
      }          
    }
  })
}

export default easyStarInit