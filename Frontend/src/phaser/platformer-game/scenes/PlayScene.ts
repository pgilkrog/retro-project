import Phaser from 'phaser'
import Player from '../entities/Player'
import Enemies from '../groups/Enemies'

export default class PlayScene extends Phaser.Scene {
  private player!: Phaser.Physics.Arcade.Sprite
  private enemies!: any
  private config: any

  private line: any
  private graphics: any
  private plotting: Boolean = false
  private tileHits: any

  constructor(config: any) {
    super('PlayScene')
    this.config = config
  }

  create() {
    const map = this.createMap()
    const layers = this.createLayers(map)
    const playerZones = this.getPlayerZones(layers.playerZones) 
    this.player = this.createPlayer(playerZones.start)
    this.enemies = this.createEnemies(layers.enemySpawns, layers.platformsColliders)

    this.createPlayerColliders(this.player, {
      colliders: {
        platformsColliders: layers.platformsColliders
      }
    })
    this.createEnemyColliders(this.enemies, {
      colliders: {
        platformsColliders: [layers.platformsColliders, this.player]
      }
    })

    this.createEndOfLevel(playerZones.end)
    this.setupFollowupCameraOn(this.player)
  }

  finishDrawing(pointer: any, layer: any) {
    this.line.x2 = pointer.worldX
    this.line.y2 = pointer.worldY

    this.graphics.clear()
    this.graphics.strokeLineShape(this.line)
    this.plotting = false
  
    this.tileHits = layer.getTilesWithinShape(this.line)

    if (this.tileHits.length > 0) {
      this.tileHits.forEach((tile: any) => {
        tile.index !== -1 && tile.setCollision(true)
      });
    }

  }

  createPlayer(start: any) {
    return new Player(this, start.x, start.y)
  }

  createEnemies(spawnLayer: any, platformsColliders: any) {
    const enemies = new Enemies(this)
    const enemyTypes: any = enemies.getTypes()

    spawnLayer.objects.map((spawnPoint: any, i: any) => {
      if (i === 1) { return }

      const enemy = new enemyTypes[spawnPoint.name](this, spawnPoint.x, spawnPoint.y)
      enemy.setPlatformColliders(platformsColliders)
      enemies.add(enemy)
    })

    return enemies
  }

  createEnemyColliders(enemies: any, { colliders }: any) {
    enemies.addCollider(colliders.platformsColliders)
      .addCollider(colliders.player)
  }

  createMap() {
    const map = this.make.tilemap({ key: 'map' })
    map.addTilesetImage('main_lev_build_1', 'tiles-1')
    
    return map
  }

  createLayers(map: any) {
    const tileset = map.getTileset('main_lev_build_1')
    const platformsColliders = map.createLayer('platforms_colliders', tileset)
    const environment = map.createLayer('environment', tileset)
    const platforms = map.createLayer('platforms', tileset)
    const playerZones = map.getObjectLayer('player_zones')
    const enemySpawns = map.getObjectLayer('enemy_spawns')

    platformsColliders.setCollisionByProperty({ collides: true })
    
    return {environment, platforms, platformsColliders, playerZones, enemySpawns}
  }

  createPlayerColliders(player: any, { colliders }: any) {
    player.addCollider(colliders.platformsColliders)
  }

  setupFollowupCameraOn(player: any) {
    const { height, width, mapOffset, zoomFactor } = this.config
    this.physics.world.setBounds(0, 0, width + mapOffset, height + 200)
    this.cameras.main.setBounds(0, 0, width + mapOffset, height).setZoom(zoomFactor)
    this.cameras.main.startFollow(player)
  }

  getPlayerZones(playerZonesLayer: any) {
    const playerZones = playerZonesLayer.objects

    return {
      start: playerZones.find((zone: any) => zone.name === 'startZone'),
      end: playerZones.find((zone: any) => zone.name === 'endZone')
    }
  }

  createEndOfLevel(end: any) {
    const endOFLevel = this.physics.add.sprite(end.x, end.y, 'end')
      .setAlpha(0)
      .setSize(5, 200)
      .setOrigin(0.5, 1)
    
    const eolOverlap = this.physics.add.overlap(this.player, endOFLevel, () => {
      eolOverlap.active = false
      console.log('Player has won!')
    })
  }
}