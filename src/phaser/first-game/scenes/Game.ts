import { Bodies } from 'matter'
import { Scene } from 'phaser'
import ObstaclesController from './ObstaclesController'
// import { debugDraw } from '@/phaser/utils/debug'
import PlayerController from './PlayerController'
import SkeletonController from './SkeletonController'

export default class Game extends Scene {
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys
  private player!: Phaser.Physics.Matter.Sprite
  private playerController?: PlayerController
  private obstaclesController!: ObstaclesController
  private skeletons?: SkeletonController[] = []

  constructor() {
    super({ key: 'PlayScene' })
  }

  init() {
    this.cursors = this.input.keyboard.createCursorKeys()
    this.obstaclesController = new ObstaclesController()
    this.skeletons = []

    this.events.once(Phaser.Scenes.Events.DESTROY, () => {
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
          this.player.setFixedRotation()

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
    this.skeletons.forEach(skeleton => skeleton.destroy())
  }
}
