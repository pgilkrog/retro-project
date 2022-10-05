import { Scene } from 'phaser'
// import { debugDraw } from '@/phaser/utils/debug'
import PlayerController from './PlayerController'

export default class Game extends Scene {
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys
  private player!: Phaser.Physics.Matter.Sprite
  private playerController?: PlayerController

  constructor() {
    super({ key: 'PlayScene' })
  }

  preload() {
    this.cursors = this.input.keyboard.createCursorKeys()
  }

  create() {
    this.scene.launch('ui')

    const map = this.make.tilemap({ key: 'map1' })
    const tilesets = map.addTilesetImage('Tiles', 'tiles', 16, 16)

    map.createLayer('Background', tilesets)
    map.createLayer('Walls', tilesets)
    map.createLayer('Wall-Decor', tilesets)
    map.createLayer('Decorations', tilesets)
    map.createLayer('Spikes', tilesets)
    const groundLayer = map.createLayer('Ground', tilesets)
    groundLayer.setCollisionByProperty({ collides: true })

    // debugDraw(groundLayer, this)
    const objectLayer = map.getObjectLayer('Objects')

    objectLayer.objects.forEach(objData => {

      const { x = 0, y = 0, name = "", width = 0, height = 0 } = objData

      switch (name) {
        case 'Player_Spawn': {
          this.player = this.matter.add.sprite(x, y, 'character', 'Cut/mage-idle-1.png')
            .setFixedRotation()

          this.playerController = new PlayerController(this.player, this.cursors)
          this.cameras.main.startFollow(this.player, true)
          break
        }
        case 'Heart': {
          const heart = this.matter.add.sprite(x, y, 'heart', undefined, {
            isStatic: true,
            isSensor: true
          })

          heart.setData('type', 'heart')
          break
        }
        case 'Spikes': {
          this.matter.add.rectangle(x + (0.5 * width), y + (0.5 * height), width, height, {
            isStatic: true
          })
          break
        }
      }
    })

    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels)
    this.cameras.main.scrollY = 9000
    this.cameras.main.zoom = 2.5

    this.matter.world.convertTilemapLayer(groundLayer)
  }

  update(t: number, dt: number) {
    if (!this.playerController)
      return

    this.playerController.update(dt)
  }
}
