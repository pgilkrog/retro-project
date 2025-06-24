export default class BombController {
  private scene: Phaser.Scene | undefined
  private solidWalls: Phaser.Tilemaps.TilemapLayer | undefined
  private breakableWalls: Phaser.Tilemaps.TilemapLayer | undefined // <-- Add this
  public bombs: Phaser.Physics.Arcade.Group | undefined
  public explosions: Phaser.Physics.Arcade.Group | undefined

  constructor(
    scene: Phaser.Scene,
    solidWalls?: Phaser.Tilemaps.TilemapLayer,
    breakableWalls?: Phaser.Tilemaps.TilemapLayer // <-- Add this
  ) {
    this.scene = scene
    this.solidWalls = solidWalls
    this.breakableWalls = breakableWalls // <-- Add this

    this.bombs = scene.physics.add.group({
      classType: Phaser.Physics.Arcade.Sprite,
      maxSize: 40,
      runChildUpdate: true,
    })

    this.explosions = scene.physics.add.group({
      defaultKey: 'explosion',
      classType: Phaser.Physics.Arcade.Sprite,
      maxSize: 200,
      runChildUpdate: true,
    })
  }

  getBomb = (x: number, y: number) => {
    const bomb = this.bombs?.get(x, y, 'bomb')

    if (bomb != undefined) {
      bomb.setActive(true).setVisible(true).setImmovable(true).setScale(0.8)
    }

    return bomb
  }

  activateBomb = (bomb: Phaser.Physics.Arcade.Sprite, range: number = 1) => {
    this.scene?.time.addEvent({
      delay: 3000,
      callback: () => {
        const tileSize = 64
        const x = bomb.x
        const y = bomb.y

        bomb.setActive(false).setVisible(false).setPosition(-200, -200)
        this.spawnExplosion(x, y)

        // Create explosions in all four directions
        const directions = [
          { dx: 1, dy: 0 },
          { dx: -1, dy: 0 },
          { dx: 0, dy: 1 },
          { dx: 0, dy: -1 },
        ]

        for (const dir of directions) {
          for (let i = 1; i <= range; i++) {
            const ex = x + dir.dx * i * tileSize
            const ey = y + dir.dy * i * tileSize

            // Check for solid wall
            if (this.solidWalls != undefined) {
              const tile = this.solidWalls.getTileAtWorldXY(ex, ey)
              if (tile != undefined && tile.collides != undefined) {
                break // Stop if wall
              }
            }

            // Check for breakable wall
            if (this.breakableWalls != undefined) {
              const tile = this.breakableWalls.getTileAtWorldXY(ex, ey)
              if (tile != undefined && tile.index !== -1) {
                // Remove the breakable wall
                this.breakableWalls.removeTileAt(tile.x, tile.y)
                this.spawnExplosion(ex, ey)
                break // Stop explosion in this direction
              }
            }

            this.spawnExplosion(ex, ey)
          }
        }
      },
    })

    console.log('Activated bomb')
  }

  spawnExplosion = (x: number, y: number) => {
    const explosion = this.explosions?.get(x, y, 'bomb')

    if (explosion != undefined) {
      explosion.setActive(true).setVisible(true).setDepth(1).setScale(1).setAlpha(1)

      this.scene?.time.addEvent({
        delay: 500,
        callback: () => {
          explosion.setActive(false).setVisible(false).setPosition(-200, -200)
        },
      })
    }
  }
}
