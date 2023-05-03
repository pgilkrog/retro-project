import Phaser from 'phaser'
import { Entity } from './Entity'
import { EntityTypes } from '../interfaces/enums'

const NPC_SPRITES = [
  'npc-1',
  'npc-2',
  'npc-3'
] 

export default class NPC extends Entity {
  public isFollowingPath: boolean = false
  private showInventory: boolean = false

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(
      scene, 
      x, 
      y, 
      Phaser.Math.RND.pick(NPC_SPRITES), 
      100, 
      100, 
      50, 
      50,
      EntityTypes.Associate
    )
   
    this.inventory.addItem(this.itemsManager.getFoodItems()[0], 2)
    this.createInventory(scene, false)
    this.toggleInventory(false)

    this.on('pointerdown', () => {
      console.log("CLICKED NPC", this.inventory)
      this.showInventory = !this.showInventory
      this.toggleInventory(this.showInventory)
    }, this)
  }

  startWalkAnimation(path: any) {
    let currentPointIndex = 0
    let currentPoint = path[currentPointIndex]
  
    const update = () => {
      let dx = currentPoint.x - this.x
      let dy = currentPoint.y - this.y
      let distance = Math.sqrt(dx * dx + dy * dy)
  
      if (distance <= 1) {
        currentPointIndex++
        if (currentPointIndex >= path.length) {
          // We reached the end of the path
          this.isFollowingPath = false
          this.setVelocity(0, 0)
          return
        }

        currentPoint = path[currentPointIndex]
        dx = currentPoint.x - this.x
        dy = currentPoint.y - this.y
        distance = Math.sqrt(dx * dx + dy * dy)
      }
  
      const vx = (dx / distance) * this.speed
      const vy = (dy / distance) * this.speed
      this.setVelocity(vx, vy)
    }
  
    this.scene.events.on('update', update)
  }
}