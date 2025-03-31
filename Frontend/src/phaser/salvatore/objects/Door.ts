import Phaser from 'phaser'

export default class Door {
  private readonly zone: Phaser.GameObjects.Zone
  private coords: { x: number; y: number }

  constructor(scene: Phaser.Scene, x: number, y: number) {
    this.zone = new Phaser.GameObjects.Zone(scene, x - 18, y - 40, 32, 60)
    this.zone.setOrigin(0)

    this.zone.setInteractive({
      useHandCursor: true,
      cursor: 'pointer',
    })
    this.zone.on('pointerdown', () => {
      // console.log('Door clicked')
      // scene.sys.game.scene.switch('Game', 'Apartment1')
    })
    this.coords = { x: x, y: y }
    scene.add.existing(this.zone)
  }

  getCords() {
    return this.coords
  }
}
