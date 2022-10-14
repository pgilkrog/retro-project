import Phaser, { Scene } from 'phaser'
import ObstaclesController from './ObstaclesController'

export default class SpellsController {
  private magicMissile: Phaser.Physics.Matter.Sprite
  private scene: Scene
  private obstacles: ObstaclesController  
  

  constructor(missile: Phaser.Physics.Matter.Sprite, scene: Scene, obstacles: ObstaclesController) {
    this.magicMissile = missile
    this.scene = scene
    this.obstacles = obstacles

    this.magicMissile.setRectangle(16, 16)
    this.magicMissile.setFixedRotation()
    this.magicMissile.anims.create({
      key: 'magic-missile-shoot',
      frames: this.magicMissile.anims.generateFrameNames('magic-missile', { start: 1, end: 30, prefix: 'magic-missile-', suffix: '.png' }),
      repeat: -1,
      frameRate: 20
    })
    this.magicMissile.play('magic-missile-shoot')
    this.magicMissile.setIgnoreGravity(true)
  
    this.magicMissile.setOnCollide((data: MatterJS.ICollisionPair) => {
      const body = data.bodyB as MatterJS.BodyType
      const gameObject = body.gameObject
      
      if (this.obstacles.is('skeleton', body)) {
        console.log("THIS COLLIDED", body)
        this.magicMissile.setPosition(-100, -100)
        
        return         
      }
    })
  }
}