import { sharedInstance as events, CUSTOM_EVENTS } from '../scenes/EventCenter'

export default class DialogController {
  static #instance

  private dialogTree
  private scene: Phaser.Scene

  constructor(scene: Phaser.Scene) {
    if (DialogController.#instance) {
      throw new Error('Use GameManager.getInstance() instead of new')
    }

    this.scene = scene
  }

  static getInstance(scene: Phaser.Scene) {
    if (DialogController.#instance == undefined) {
      DialogController.#instance = new DialogController(scene)
    }
    return DialogController.#instance
  }

  create() {
    this.dialogTree = this.scene.cache.json.get('dialogs')
  }

  getDialogTree() {
    return this.dialogTree
  }

  getDialogNode(id: string) {
    return this.dialogTree[id]
  }

  public callDialog(id: string) {
    var node = this.getDialogNode(id)
    var dialog = node.greetings
    events.emit(CUSTOM_EVENTS.SHOW_DIALOG, dialog)
    console.log(node.greetings.start[0])
  }
}
