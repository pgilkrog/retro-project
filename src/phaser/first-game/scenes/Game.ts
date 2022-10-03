import { Scene } from 'phaser'
import { debugDraw } from '@/phaser/utils/debug'
import PlayerController from './PlayerController'

export default class Game extends Scene {
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys
  private player!: Phaser.Physics.Arcade.Sprite
  private playerController?: PlayerController

  constructor () {
    super({ key: 'PlayScene'})
  }

  preload() {
    this.cursors = this.input.keyboard.createCursorKeys()
  }

  create () {
    console.log("GAME SCENE")
    const map = this.make.tilemap({ key: 'map1' })
    const tilesets = map.addTilesetImage('Tiles', 'tiles', 16, 16)

    const mapsize = map.createLayer('Background', tilesets)
    map.createLayer('Walls', tilesets)
    map.createLayer('Wall-Decor', tilesets)
    map.createLayer('Decorations', tilesets)
    const groundLayer = map.createLayer('Ground', tilesets)
    groundLayer.setCollisionByProperty({ collides: true })

    mapsize.width = 960
    mapsize.height = 960
    // debugDraw(groundLayer, this)

    this.player = this.physics.add.sprite(10, 890, 'character', 'knight/stand_up_5.png')
    this.player.body.setSize(this.player.width * 0.5, this.player.height * 0.6)
    this.player.body.offset.y = 14

    // this.anims.create({
    //   key: 'character-idle',
    //   frames: [{ key: 'character', frame: 'knight/stand_up_5.png' }]
    // })

    // this.anims.create({
    //   key: 'character-walk',
    //   frames: this.anims.generateFrameNames('character', { start: 1, end: 6, prefix: 'knight/walk_', suffix: '.png' }),
    //   repeat: -1,
    //   frameRate: 10
    // })

    // this.anims.create({
    //   key: 'character-run',
    //   frames: this.anims.generateFrameNames('character', { start: 1, end: 6, prefix: 'knight/run_', suffix: '.png' }),
    //   repeat: -1,
    //   frameRate: 10,
    // })

    this.playerController = new PlayerController(this.player, this.cursors)
    // this.player.anims.play('character-idle')

    this.physics.add.collider(this.player, groundLayer)

    this.player.setCollideWorldBounds(true)
    this.player.setGravityY(400)
    this.player.body.bounce.y = 0.1
    this.player.setMaxVelocity(200, 5000)

    // const bomb = this.physics.add.image(400, 200, 'bomb')
    // bomb.setCollideWorldBounds(true)
    // bomb.body.onWorldBounds = true // enable worldbounds collision event
    // bomb.setBounce(1)
    // bomb.setVelocity(200, 20)

    // this.sound.add('thud')
    // this.physics.world.on('worldbounds', () => {
    //   this.sound.play('thud', { volume: 0.75 })
    // })

    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.cameras.main.startFollow(this.player, true)
    this.cameras.main.scrollY = 9000
    this.cameras.main.zoom = 2.5
  }

  update(t: number, dt: number) {
    if(!this.playerController)
      return

    this.playerController.update(dt)
  }
}
