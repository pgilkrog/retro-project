import { Item } from './models/Item'
import type Phaser from 'phaser'

export class ItemsManager {
  private scene: Phaser.Scene

  constructor(scene: Phaser.Scene) {
    this.scene = scene
  }

  create1by1() {
    const newItem = new Item(
      '1 by 1', 
      this.createImage('ball'),
      'a tiny box',
      1,
      1,
      20,
      this.createText()
    )

    return newItem
  }

  create1by2() {
    const newItem = new Item(
      '1 by 2', 
      this.createImage('paddle'),
      'a box that is more longer than wide',
      1,
      2,
      10,
      this.createText()
    )

    return newItem
  }

  create2by2() {
    const newItem = new Item(
      '2 by 2', 
      this.createImage('bigBox'),
      'a tiny box',
      2,
      2,
      5,
      this.createText()
    )

    return newItem
  }

  create4by2() {
    const newItem = new Item(
      '4 by 2', 
      this.createImage('largeBox'),
      'a tiny box',
      4,
      2,
      1,
      this.createText()
    )

    return newItem
  }

  createImage(name: string) {
    return  this.scene.add.image(
      1300,
      1000,
      name
    )
  }

  createText() {
    return this.scene.add.text(0, 0, '')      
      .setFont('24px Arial')
      .setStroke('#000000', 2)
      .setColor('#FFFFFF')
  }

  getItem(name: string) {
    switch(name) {
      case '1 by 1':  {
        return this.create1by1()
      }
      case '1 by 2': {
        return this.create1by2()
      }
      case '2 by 2': {
        return this.create2by2()
      }
      case '4 by 2': {
        return this.create4by2()
      }
    }
  }
}