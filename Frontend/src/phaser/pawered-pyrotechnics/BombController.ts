export default class BombController {
  private scene: Phaser.Scene | undefined
  public bombs: Phaser.Physics.Arcade.Group | undefined
  public explosions: Phaser.Physics.Arcade.Group | undefined

  constructor(scene: Phaser.Scene) {
    this.scene = scene

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

  activateBomb = (bomb: Phaser.Physics.Arcade.Sprite, range: number = 3) => {
    this.scene?.time.addEvent({
      delay: 3000,
      callback: () => {
        const tileSize = 64 // Adjust based on your tile/grid size

        const x = bomb.x
        const y = bomb.y

        // Hide the bomb
        bomb.setActive(false).setVisible(false).setPosition(-200, -200)

        // Center explosion
        this.spawnExplosion(x, y)

        // Explode in 4 directions
        for (let i = 1; i <= range; i++) {
          this.spawnExplosion(x + i * tileSize, y) // Right
          this.spawnExplosion(x - i * tileSize, y) // Left
          this.spawnExplosion(x, y + i * tileSize) // Down
          this.spawnExplosion(x, y - i * tileSize) // Up
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
