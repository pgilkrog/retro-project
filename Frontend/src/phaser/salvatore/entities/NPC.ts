import Phaser from 'phaser'

export default class NPC extends Phaser.Physics.Arcade.Sprite {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'npc')

    scene.add.existing(this)
    scene.physics.add.existing(this)

    this.init()
  }

  init() {
    this.setCollideWorldBounds(true)
    this.body.setSize(24, 36, true)
    this.body.setOffset(5, 4)
    this.setScale(0.7)
    this.setInteractive()
    this.setImmovable(true)

    this.on('pointerdown', () => {
      console.log("CLICKED NPC")
    }, this)
  }

  startWalkAnimation(path: any, speed: number) {
    let currentPointIndex = 0
    let currentPoint = path[currentPointIndex]
  
    const update = (delta: number) => {
      let dx = currentPoint.x - this.x
      let dy = currentPoint.y - this.y
      let distance = Math.sqrt(dx * dx + dy * dy)
  
      if (distance <= 1) {
        currentPointIndex++
        if (currentPointIndex >= path.length) {
          // We reached the end of the path
          this.setVelocity(0, 0)
          return
        }
        currentPoint = path[currentPointIndex]
        dx = currentPoint.x - this.x
        dy = currentPoint.y - this.y
        distance = Math.sqrt(dx * dx + dy * dy)
      }
  
      const vx = (dx / distance) * speed
      const vy = (dy / distance) * speed
      this.setVelocity(vx, vy)
    }
  
    this.scene.events.on('update', update)
  }
}