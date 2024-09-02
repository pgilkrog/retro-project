import Phaser, { Physics, Scene } from 'phaser'

export default class Alien {
  private scene: Phaser.Scene
  private alien_speed = 200
  private direction = 1
  private alienBullets: Phaser.Physics.Arcade.Group
  private lazerSound2: any

  constructor(scene: Phaser.Scene) {
    this.scene = scene
  }

  create = () => {
    this.alienBullets = this.scene.physics.add.group({
      classType: Phaser.Physics.Arcade.Sprite,
      maxSize: 30,
      runChildUpdate: true
    })
    this.lazerSound2 = this.scene.sound.add('lazershot2')
  }

  update = (time: number, dt: number) => {
    this.alienBullets.children.each((bullet: any) => {
      if (bullet.y > this.scene.physics.world.bounds.height) this.resetBullet(bullet)
      return bullet
    })
  }

  createAlienGroups = (aliens: any) => {
    this.scene.physics.add.group({
      key: 'red',
      repeat: 20, 
      setXY: { x: 51, y: 50, stepX: 70 },
      collideWorldBounds: true
    }).children.each((alien: any) => {
      alien.setScale(0.6)
      aliens.add(alien)
      this.addAlienShootEvent(alien)
      return alien
    })

    this.scene.physics.add.group({
      key: 'yellow',
      repeat: 20, 
      setXY: { x: 51, y: 100, stepX: 70 },
      collideWorldBounds: true,
    }).children.each((alien: any) => {
      alien.setScale(0.8)
      aliens.add(alien)
      this.addAlienShootEvent(alien)
      return alien
    })

    this.scene.physics.add.group({
      key: 'green',
      repeat: 20, 
      setXY: { x: 51, y: 150, stepX: 70 },
      collideWorldBounds: true,
    }).children.each((alien: any) => {
      aliens.add(alien)
      this.addAlienShootEvent(alien)
      return alien
    })
  }

  addAlienShootEvent = (alien: any) => {
    this.scene.time.addEvent({
      delay: Phaser.Math.RND.between(5000, 50000), // Random between 1 and 2 seconds
      callback: () => this.alienShoot(alien),
      loop: true, // Keep firing at random intervals
    })
  }

  alienShoot = (alien: any) => {
    if (alien.active === true) {
      const bullet = this.alienBullets.get(alien.x, alien.y)
      if (bullet) {
        this.lazerSound2.play()
        bullet.setActive(true)
          .setVisible(true)
          .setVelocityY(600)
          .setVelocityX(0)
          .setTexture('bullet', 0xff00ff)
          .setSize(8, 20)
          .setTint(0x00ff00)
      }      
    }
  }

  getAlienBullets = () => {
    return this.alienBullets 
  }

  moveAliens(aliens: any, jumpSound: any) {
    let rightmostAlien = 50
    let leftmostAlien = this.scene.physics.world.bounds.width - 50

    aliens.children.each((alien: any, index: number) => {
      if (alien.y > this.scene.physics.world.bounds.height) this.scene.scene.stop()
      alien.setVelocityX(this.alien_speed * this.direction)
      
      if (alien.x > rightmostAlien) {
        return rightmostAlien = alien.x;
      }
      if (alien.x < leftmostAlien) {
        return leftmostAlien = alien.x;
      }
    })

    if (rightmostAlien > (this.scene.physics.world.bounds.width - 50)) {
      jumpSound.play()
      this.direction = -1
      aliens.children.each((alien: any) => {
        return alien.setY(alien.y+4)
      })
    } else if (leftmostAlien < 50) {
      jumpSound.play()
      this.direction = 1
      aliens.children.each((alien: any) => {
        return alien.setY(alien.y+4)
      })
    }
  }
  resetBullet = (bullet: Physics.Arcade.Sprite) => {
    bullet.setActive(false)
      .setVisible(false)
      .setPosition(-20, -20)
      .setVelocityY(0)
  }
}