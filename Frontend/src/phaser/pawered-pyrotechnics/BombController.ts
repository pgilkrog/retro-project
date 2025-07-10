import CardController from "./CardController"

export default class BombController {
  private scene: Phaser.Scene | undefined
  private solidWalls: Phaser.Tilemaps.TilemapLayer | undefined
  private breakableWalls: Phaser.Tilemaps.TilemapLayer | undefined
  public bombs: Phaser.Physics.Arcade.Group | undefined
  public explosions: Phaser.Physics.Arcade.Group | undefined
  private cardController: CardController | undefined

  constructor(
    scene: Phaser.Scene,
    solidWalls?: Phaser.Tilemaps.TilemapLayer,
    breakableWalls?: Phaser.Tilemaps.TilemapLayer,
    cardController?: CardController
  ) {
    this.scene = scene
    this.solidWalls = solidWalls
    this.breakableWalls = breakableWalls 
    this.cardController = cardController

    this.bombs = scene.physics.add.group({
      classType: Phaser.Physics.Arcade.Sprite,
      maxSize: 40,
      runChildUpdate: true,
    })

    this.explosions = scene.physics.add.group({
      defaultKey: 'explosion',
      classType: Phaser.Physics.Arcade.Sprite,
      maxSize: 100,
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
    if (this.scene == undefined) {
      return
    }

    this.scene.time.addEvent({
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
                // spawn a card randomly
                if (Math.random() < 0.5) {
                  this.cardController?.spawnCard(ex, ey)
                }

                this.spawnExplosion(ex, ey)
                break // Stop explosion in this direction
              }
            }

            this.spawnExplosion(ex, ey)
          }
        }
      },
    })
  }

  spawnExplosion = (x: number, y: number) => {
    const explosion = this.explosions?.get(x, y, 'explosion')

    if (explosion != undefined) {
      explosion.setActive(true).setVisible(true).setScale(2.46).setDepth(1).setAlpha(1)

      this.scene?.time.addEvent({
        delay: 500,
        callback: () => {
          explosion.setActive(false).setVisible(false).setPosition(-200, -200)
        },
      })
    }
  }
}
