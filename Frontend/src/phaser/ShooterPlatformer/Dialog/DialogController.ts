import { sharedInstance as events, CUSTOM_EVENTS } from '../scenes/EventCenter'

export default class DialogController {
  static #instance

  private dialogTree
  private scene: Phaser.Scene

  private currentDialogNode
  private dialogIsActive: boolean = false

  constructor(scene: Phaser.Scene | undefined) {
    if (DialogController.#instance) {
      throw new Error('Use GameManager.getInstance() instead of new')
    }

    if (scene != undefined) {
      this.scene = scene
    }
  }

  static getInstance(scene: Phaser.Scene | undefined) {
    if (DialogController.#instance == undefined) {
      console.log('get instance')
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

  public initiateDialog(id: string) {
    this.scene.scene.pause()
    this.dialogIsActive = true
    this.currentDialogNode = this.getDialogNode(id)
    var dialog = this.currentDialogNode.greetings
    events.emit(CUSTOM_EVENTS.SHOW_DIALOG, dialog)
  }

  public callNextDialog(id: string) {
    if (id === 'close dialog') {
      this.stopDialog()
    } else {
      var newDialog = this.currentDialogNode[id]
      events.emit(CUSTOM_EVENTS.SHOW_DIALOG, newDialog)
    }
  }

  public stopDialog() {
    events.emit(CUSTOM_EVENTS.CLOSE_DIALOG)
    this.currentDialogNode = undefined
    this.dialogIsActive = false
    this.scene.scene.resume()
  }

  public getDialogIsActive() {
    return this.dialogIsActive
  }
}
