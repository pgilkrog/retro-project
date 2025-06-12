import Phaser, { Physics, Scene } from 'phaser'
import Alien from '../entities/Alien'

type PhaserGroup = Phaser.Physics.Arcade.Group

export default class Game extends Scene {
  private player: Phaser.Physics.Arcade.Sprite | undefined
  private aliens: PhaserGroup | undefined
  private bullets: PhaserGroup | undefined
  private bullets2: PhaserGroup | undefined
  private barriers: Phaser.Physics.Arcade.StaticGroup | undefined

  private keyA: any
  private keyD: any
  private keySpace: any
  private canShoot: boolean = true

  private bullet_speed = 600

  private worldBounds: any = undefined

  private lazerSound: any
  private jumpSound: any
  private selectSound: any

  private highScore: number = 0
  private highScoreText: Phaser.GameObjects.Text | undefined

  private alienCtr: any

  constructor() {
    super({ key: 'Game' })
    this.alienCtr = new Alien(this)
  }

  create = (): void => {
    this.alienCtr.create()
    this.worldBounds = this.physics.world.bounds
    this.lazerSound = this.sound.add('lazershot')
    this.jumpSound = this.sound.add('jump')
    this.selectSound = this.sound.add('selectSound')

    let image = this.add.image(
      this.cameras.main.width / 2,
      this.cameras.main.height / 2,
      'space-art'
    )
    let scaleX = this.cameras.main.width / image.width
    let scaleY = this.cameras.main.height / image.height
    let scale = Math.max(scaleX, scaleY)
    image.setScale(scale).setScrollFactor(0)

    // this.selectSound.loop = true
    // this.selectSound.play()

    this.aliens = this.physics.add.group()

    this.alienCtr.createAlienGroups(this.aliens)

    this.bullets = this.physics.add.group({
      classType: Phaser.Physics.Arcade.Sprite,
      maxSize: 30,
      runChildUpdate: true,
    })
    this.bullets2 = this.physics.add.group({
      classType: Phaser.Physics.Arcade.Sprite,
      maxSize: 30,
      runChildUpdate: true,
    })

    // Create the barriers group with physics enabled
    this.barriers = this.physics.add.staticGroup({})

    // Add barrier sprites to the group with positions and textures
    this.createBarriers()

    this.player = this.physics.add
      .sprite(this.worldBounds.width / 2, this.physics.world.bounds.height - 100, 'player')
      .setCollideWorldBounds(true)

    this.physics.add.collider(this.bullets, this.aliens, this.collideBulletAlien)
    this.physics.add.collider(this.bullets2, this.aliens, this.collideBulletAlien)
    this.physics.add.collider(this.bullets, this.barriers, this.collideBulletBarrier)
    this.physics.add.collider(this.bullets2, this.barriers, this.collideBulletBarrier)

    this.physics.add.collider(this.player, this.aliens, this.collidePlayerAlien)
    this.physics.add.collider(
      this.player,
      this.alienCtr.getAlienBullets(),
      this.collidePlayerBullet
    )
    this.physics.add.collider(
      this.alienCtr.getAlienBullets(),
      this.barriers,
      this.collideBulletBarrier
    )
    this.physics.add.collider(this.aliens, this.barriers, this.collideAlienBarrier)

    this.keyA = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.A)
    this.keyD = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.D)
    this.keySpace = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)

    this.highScoreText = this.add
      .text(10, 10, `SCORE: ${this.highScore}`, { fontSize: '42px', color: '#000000' })
      .setStroke('#00ff00', 4)
      .setFontFamily('Arial')
  }

  update = (time: number, delta: number): void => {
    this.bullets?.children.each((bullet: any) => {
      if (bullet.y < 0) {
        this.resetBullet(bullet)
      }
      return bullet
    })

    this.bullets2?.children.each((bullet: any) => {
      if (bullet.y < 0) {
        this.resetBullet(bullet)
      }
      return bullet
    })

    this.player?.setVelocity(0, 0)

    if (this.keyA.isDown) {
      this.player?.setVelocity(-300, 0)
    } else if (this.keyD.isDown) {
      this.player?.setVelocity(300, 0)
    }

    if (this.keySpace.isDown) {
      this.shoot()
    }

    this.alienCtr.moveAliens(this.aliens, this.jumpSound)
    this.alienCtr.update(time, delta)
  }

  shoot = () => {
    if (this.canShoot === false) return

    const bullet = this.bullets?.get(this.player?.x! - 20, this.player?.y! - 40)
    const bullet2 = this.bullets2?.get(this.player?.x! + 20, this.player?.y! - 40)

    if (bullet) {
      bullet
        .setActive(true)
        .setVisible(true)
        .setVelocityY(-this.bullet_speed)
        .setVelocityX(0)
        .setTexture('bullet')
        .setSize(8, 20)
      if (bullet2)
        bullet2
          .setActive(true)
          .setVisible(true)
          .setVelocityY(-this.bullet_speed)
          .setVelocityX(0)
          .setTexture('bullet')
          .setSize(8, 20)

      this.canShoot = false
      this.lazerSound.play()

      setTimeout(() => {
        this.canShoot = true
      }, 500)
    }
  }

  moveAliensDown = () => {
    this.tweens.add({
      targets: this.aliens?.getChildren(),
      y: '+=90',
      duration: 2000,
    })
  }

  collideBulletAlien = (bullet: any, alien: any) => {
    this.resetBullet(bullet)
    alien.destroy()

    this.highScore += 10
    this.updateHighscoreText()
  }

  collidePlayerAlien = (player: any, alien: any) => {
    this.scene.pause()
    // player.disableBody(true, true).setActive(false)
  }

  collidePlayerBullet = (player: any, alienBullet: any) => {
    this.stopGameScene()
    this.resetBullet(alienBullet)
  }

  collideBulletBarrier = (bullet: any, barrier: any) => {
    this.resetBullet(bullet)
    barrier.destroy()
  }

  collideAlienBarrier = (alien: any, barrier: any) => {
    alien.destroy()
    barrier.destroy()
  }

  resetBullet = (bullet: Physics.Arcade.Image) => {
    bullet
      .setActive(false)
      .setVisible(false)
      .setPosition(-20, -20)
      .setVelocityY(0)
      .setVelocityX(0)
      .setTexture('')
      .setSize(0, 0)
  }

  stopGameScene = () => {
    this.scene.stop()
  }

  updateHighscoreText = () => {
    this.highScoreText?.setText(`SCORE: ${this.highScore}`)
  }

  createBarriers = () => {
    const barrierWidth = 32
    const barrierHeight = 32
    const barrierSpacing = 0

    this.createBarrierArray(barrierWidth, barrierHeight, barrierSpacing, 200)
    this.createBarrierArray(barrierWidth, barrierHeight, barrierSpacing, 600)
    this.createBarrierArray(barrierWidth, barrierHeight, barrierSpacing, 1000)
    this.createBarrierArray(barrierWidth, barrierHeight, barrierSpacing, 1400)
  }

  createBarrierArray = (
    barrierWidth: number,
    barrierHeight: number,
    barrierSpacing: number,
    xCords: number
  ) => {
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 3; j++) {
        this.barriers
          ?.create(
            xCords + i * (barrierWidth + barrierSpacing),
            this.worldBounds.height - 300 + j * (barrierHeight + barrierSpacing),
            'barrier'
          )
          .body.setSize(barrierWidth, barrierHeight)
      }
    }
  }
}
