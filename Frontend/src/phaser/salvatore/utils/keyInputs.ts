export default class keyInputs {
  private keyInputs: {
    [key: string]: Phaser.Input.Keyboard.Key
  } = {}

  constructor(scene: Phaser.Scene) {
    this.keyInputs['keyW'] = scene.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.W)
    this.keyInputs['keyS'] = scene.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.S)
    this.keyInputs['keyA'] = scene.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.A)
    this.keyInputs['keyD'] = scene.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.D)
  }

  keys(key: string) {
    return this.keyInputs[key]
  }
}
