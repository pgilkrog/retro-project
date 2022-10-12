import { Scene } from 'phaser'
// import { debugDraw } from '@/phaser/utils/debug'
import PlayerController from '@/phaser/first-game/controllers/PlayerController'
import SkeletonController from '@/phaser/first-game/controllers/SkeletonController'
import ObstaclesController from '@/phaser/first-game/controllers/ObstaclesController'

export default class Game extends Scene {
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys
  private player!: Phaser.Physics.Matter.Sprite
  private playerController?: PlayerController
  private obstaclesController!: ObstaclesController
  private skeletons?: SkeletonController[] = []
  private missiles?: any[] = []

  constructor() {
    super({ key: 'PlayScene' })
  }

  init() {
    this.cursors = this.input.keyboard.createCursorKeys()

    this.obstaclesController = new ObstaclesController()
    this.skeletons = []
    this.missiles = []

    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
      this.destroy()
  })
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
          this.player.setRectangle(16, 32)
          this.player.setDisplayOrigin(16, 24)
          this.player.setFixedRotation()
          
          this.player.setFriction(0)

          this.playerController = new PlayerController(this, this.player, this.cursors, this.obstaclesController)
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

        case 'Potion_Health': {
          const potionHealth = this.matter.add.sprite(x, y, 'potion-health', undefined, {
            isStatic: true,
            isSensor: true
          })
          potionHealth.setData('type', 'potion-health')
          potionHealth.setData('healthPoints', 10)
          break
        }

        case 'Spikes': {
          const spike = this.matter.add.rectangle(x + (0.5 * width), y + (0.5 * height), width, height, {
            isStatic: true
          })
          this.obstaclesController.add('spikes', spike)
          break
        }

        case 'Mob_Skeleton': {
          const skeleton = this.matter.add.sprite(x, y, 'mob-skeleton').setFixedRotation()
          this.skeletons.push(new SkeletonController(skeleton, this))
          this.obstaclesController.add('skeleton', skeleton.body as MatterJS.BodyType)
          break
        }
      }
    })

    const magicMissile = this.matter.add.sprite(-100, -100, 'magic-missile', undefined, {
      isSensor: true
    })
    magicMissile.setRectangle(16, 16)
    magicMissile.setFixedRotation()

    this.missiles.push(magicMissile)
    this.playerController.setMagicMissile(magicMissile)

    //  = this.matter.add.sprite(this.player.body.position.x, this.player.body.position.y, 'magic-missile').setFixedRotation()
    // this.magicMissiles.push(magicMissile)
    // // this.obstaclesController.add('magic-missile', magicMissiles.body as MatterJS.BodyType)
    magicMissile.anims.create({
      key: 'magic-missile-shoot',
      frames: magicMissile.anims.generateFrameNames('magic-missile', { start: 1, end: 30, prefix: 'magic-missile-', suffix: '.png' }),
      repeat: -1,
      frameRate: 20
    })
    magicMissile.play('magic-missile-shoot')
    magicMissile.setIgnoreGravity(true)

    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels)
    this.cameras.main.scrollY = 9000
    this.cameras.main.zoom = 2.5

    this.matter.world.convertTilemapLayer(groundLayer)
  }

  update(t: number, dt: number) {
    this.playerController?.update(dt)

    this.skeletons.forEach(skeleton => skeleton.update(dt))
  }

  destroy() {
    this.scene.stop('ui')
    this.skeletons.forEach(skeleton => skeleton.destroy())
  }
}
