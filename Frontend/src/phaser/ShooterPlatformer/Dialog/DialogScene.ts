import { Scene } from 'phaser'
import { sharedInstance as events, CUSTOM_EVENTS } from '../scenes/EventCenter'
import DialogController from './DialogController'

export default class DialogScene extends Scene {
  private dialogContainer: Phaser.GameObjects.Container
  private dialogText: Phaser.GameObjects.Text
  private dialogSelectionText: Phaser.GameObjects.Text
  private dialogController: DialogController

  constructor() {
    super({ key: 'dialog' })
    this.dialogController = DialogController.getInstance(this)
  }

  create() {
    const gameWidth = this.scale.width
    const gameHeight = this.scale.height
    const containerWidth = 780
    const containerHeight = 100

    const background = this.add
      .rectangle(0, 0, containerWidth, containerHeight, 0x000000, 0.9)
      .setOrigin(0.5, 1)
      .setStrokeStyle(2, 0xffffff)

    this.dialogContainer = this.add.container(
      gameWidth / 2,
      gameHeight - 200, // y at bottom
      [background]
    )

    this.dialogText = this.add
      .text(-containerWidth / 2 + 16, -containerHeight + 16, '', {})
      .setOrigin(0)
    this.dialogContainer.add(this.dialogText)

    this.dialogContainer.setVisible(false)

    events.on(CUSTOM_EVENTS.SHOW_DIALOG, this.showDialog, this)
    events.on(CUSTOM_EVENTS.CLOSE_DIALOG, this.closeDialog, this)

    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
      events.off(CUSTOM_EVENTS.SHOW_DIALOG, this.showDialog, this)
      events.off(CUSTOM_EVENTS.CLOSE_DIALOG, this.closeDialog, this)
    })
  }

  showDialog(dialog) {
    this.dialogContainer.setVisible(true)
    this.dialogText.setText(this.getRandomTextFromArray(dialog.start))
    this.dialogSelectionText = dialog.responses.map((response, index) => {
      let btn = this.add
        .text(-780 / 2 + 16, -100 + 48, response, {})
        .setOrigin(0)
        .setInteractive()
        .on('pointerdown', () => {
          this.showDialog(response.next)
        })
      return btn
    })

    this.dialogContainer.add(this.dialogSelectionText)
  }

  closeDialog() {
    this.dialogContainer.setVisible(false)
    this.dialogText.setText('')
  }

  getRandomTextFromArray(textArray: string[]) {
    const randomIndex = Math.floor(Math.random() * textArray.length)
    return textArray[randomIndex]
  }
}
