import type Phaser from 'phaser'

interface TilePosition {
  x: number,
  y: number
}

const toKey = (x: number, y: number) => `${x}x${y}`

const findPath = (start: Phaser.Math.Vector2, target: Phaser.Math.Vector2, collisionLayer: Phaser.Tilemaps.TilemapLayer) => {

}

export default findPath