import { Scene } from 'phaser'
import { sharedInstance as events, CUSTOM_EVENTS } from '../scenes/EventCenter'

export default class DialogController extends Scene {
  private dialogContainer: Phaser.GameObjects.Container
  private dialogText: Phaser.GameObjects.Text

  private dialogTree

  constructor() {
    super({ key: 'dialog' })
  }

  create() {
    this.dialogContainer = this.add.container(400, 550, [
      this.add.rectangle(0, 0, 780, 100, 0x000000, 0.7).setOrigin(0),
    ])

    this.dialogText = this.add.text(16, 16, '', {}).setOrigin(0)
    this.dialogContainer.add(this.dialogText)
    this.dialogContainer.setVisible(false)

    events.on(CUSTOM_EVENTS.SHOW_DIALOG, this.showDialog, this)
    events.on(CUSTOM_EVENTS.CLOSE_DIALOG, this.showDialog, this)

    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
      events.off(CUSTOM_EVENTS.SHOW_DIALOG, this.showDialog, this)
      events.off(CUSTOM_EVENTS.CLOSE_DIALOG, this.showDialog, this)
    })
    this.dialogTree = this.cache.json.get('dialogs')
    console.log(this.dialogTree.npc.greetings[0])
  }

  showDialog(text: string) {
    this.dialogContainer.setVisible(true)
    this.dialogText.setText(text)
  }
}
