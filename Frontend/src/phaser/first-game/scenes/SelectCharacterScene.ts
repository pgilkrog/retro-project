import Phaser from 'phaser'

export default class SelectCharacterScene extends Phaser.Scene
{
  constructor() {
    super({ key: 'select-character' })
  }

  create() {
    const { width, height } = this.scale

    this.add.text(width * 0.5, height * 0.3, 'SELECT YOUR CHARACTER', {
      fontSize: '52px',
      color: '#00ff00'
    })
    .setOrigin(0.5)

    const button = this.add.rectangle(width * 0.4, height * 0.55, 150 ,75, 0xffffff)
      .setInteractive()
      .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
        this.handleContinue("Mage")
      })
    
    this.add.text(button.x, button.y, 'Mage', {
      color: "#000000"
    })
    .setOrigin(0.5)

    const button2 = this.add.rectangle(width * 0.6, height * 0.55, 150 ,75, 0xffffff)
    .setInteractive()
    .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
      this.handleContinue("Rogue")
    })
  
    this.add.text(button2.x, button2.y, 'Rogue', {
      color: "#000000"
    })
    .setOrigin(0.5)
  }

  handleContinue(character: string) {
    this.scene.start('PlayScene', { character: character })
  }
}