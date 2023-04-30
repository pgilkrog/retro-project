import BaseScene from "./BaseScene";

export default class Pause extends BaseScene {
  private menu = [
      {scene: 'Create', text: 'Continue'},
      {scene: 'Menu', text: 'Exit'},
    ]

  constructor() {
    super('PauseScene')
  }

  create() {
    super.create()
    this.createMenu(this.menu)
  }
}