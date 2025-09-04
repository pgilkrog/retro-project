import Phaser from 'phaser'

const sharedInstance = new Phaser.Events.EventEmitter()

const CUSTOM_EVENTS = {
  BULLETS_CHANGED: 'bullets-changed',
  SHOW_DIALOG: 'show-dialog',
  CLOSE_DIALOG: 'close-dialog',
}

export { sharedInstance, CUSTOM_EVENTS }
