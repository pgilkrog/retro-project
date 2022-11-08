import Enemy from './Enemy'
import initAnims from '../anims/BirdmanAnims'

export default class Birdman extends Enemy {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'birdman')
    initAnims(scene.anims)
  }  

  update(time: number, delta: number) {
    super.update(time, delta)
    this.play('birdman-idle', true)
  }
}