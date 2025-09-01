export const createKeyInputs = (scene: Phaser.Scene) => {
  if (scene.input.keyboard == undefined) {
    throw new Error('Keyboard input is not available on this scene.')
  }

  let keyInputs: {
    [key: string]: Phaser.Input.Keyboard.Key
  } = {}

  keyInputs['keyA'] = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
  keyInputs['keyD'] = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
  keyInputs['space'] = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
  keyInputs['keyR'] = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)
  keyInputs['keyE'] = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E)
  keyInputs['keyShift'] = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT)

  // this.keyInputs['keyW'] = scene.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.W)
  // this.keyInputs['keyS'] = scene.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.S)

  return keyInputs
}
