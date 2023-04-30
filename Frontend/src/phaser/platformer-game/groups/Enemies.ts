import Phaser from 'phaser'
import collidable from '../mixins/collidable'

import { ENEMY_TYPES } from '../types'

export default class Enemies extends Phaser.GameObjects.Group {
  constructor(scene: Phaser.Scene) {
    super(scene)

    Object.assign(this, collidable)
  }

  getTypes() { 
    return ENEMY_TYPES
  }
}