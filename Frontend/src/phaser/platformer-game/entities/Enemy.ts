import Phaser from 'phaser'
import collidable from '../mixins/collidable'

export default class Enemy extends Phaser.Physics.Arcade.Sprite {
  private rayGraphics: any
  private platformCollidersLayer = undefined
  private collidableJS: any
  
  constructor(scene: Phaser.Scene, x: number, y: number, key: string) {
    super(scene, x, y, key)

    scene.add.existing(this)
    scene.physics.add.existing(this)

    this.collidableJS = Object.assign(this, collidable)

    this.init()
    this.initEvents()
  }

  init() {
    this.setGravityY(500)
    this.setSize(20, 45)
    this.setOffset(7, 20)
    this.setCollideWorldBounds(true)
    this.setOrigin(0.5, 1)
    this.setImmovable(true)

    this.rayGraphics = this.scene.add.graphics({ lineStyle: { width: 2, color: 0xaa00aa } })
  }

  initEvents() {
    this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this)
  }

  update(time: number, delta: number) {
    this.setVelocityX(30)

    const { ray, hasHit } = this.collidableJS.raycast(this.body, this.platformCollidersLayer, 30, 1) 
  
    if (hasHit) {
      console.log('Hitting platform!')
    }

    this.rayGraphics.clear()
    this.rayGraphics.strokeLineShape(ray)
  }

  setPlatformColliders(platformcollidersLayer: any) {
    this.platformCollidersLayer = platformcollidersLayer
  }
}