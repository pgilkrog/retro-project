import BaseScene from "./BaseScene"

export default class Menu extends BaseScene {
  private menu = [
    {scene: 'Create', text: 'Play', textGo: {}},
    {scene: 'Score', text: 'Score', textGo: {}},
    {scene: null, text: 'Exit', textGo: {}},
  ]

  constructor() {
    super('Menu')
  }

  create() {
    super.create()
    this.createMenu(this.menu)
  }

}