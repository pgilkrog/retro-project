import Phaser from 'phaser'
import findPath from '../../utils/pathfinding/findPath'
import StateMachine from '@/phaser/utils/StateMachine'
import { createPlayerAnimations } from './PlayerAnimations'
import { Entity } from '../Entity'
import { EntityTypes } from '../../interfaces/enums'

enum playerStates {
  idle = 'idle',
  walk = 'walk',
  death = 'death',
  attack = 'attack',
  combat = 'combat',
  inCar = 'inCar',
}

enum playerAnims {
  idle = 'idle',
  walkLeft = 'walkLeft',
  walkRight = 'walkRight',
  walkUp = 'walkUp',
  walkDown = 'walkDown',
}

export default class Player extends Entity {
  private stateMachine?: StateMachine

  private movePath: Phaser.Math.Vector2[] = []
  private moveToTarget?: Phaser.Math.Vector2
  public inCar: boolean = false
  private showInventory: boolean = true
  private tabKeyPressed: boolean = false

  private keyInputs: {
    [key: string]: Phaser.Input.Keyboard.Key
  } = {}

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'npc-4', 100, 100, 0, 200, EntityTypes.Player, 50, 'Salvatore')

    this.inCar = false

    this.inventory.addItem(this.itemsManager.getFoodItems()[0], 2, 0)
    this.inventory.addItem(this.itemsManager.getWeaponItems()[0], 1, 2)
    this.inventory.addItem(this.itemsManager.getFoodItems()[1], 5, 3)
    this.inventory.addItem(this.itemsManager.getFoodItems()[2], 5, 4)
    this.inventory.addItem(this.itemsManager.getFoodItems()[3], 5, 5)
    this.inventory.addItem(this.itemsManager.getFoodItems()[4], 5, 6)
    this.inventory.addItem(this.itemsManager.getFoodItems()[5], 5, 7)
    this.inventory.addItem(this.itemsManager.getFoodItems()[6], 5, 8)
    this.inventory.addItem(this.itemsManager.getFoodItems()[6], 5, 9)

    this.initEvents()
    this.createKeyInputs()
    this.createStateMachine()
    this.createInventory(scene, true)
    this.toggleInventory(false)

    this.on(
      'pointerdown',
      () => {
        console.log('CLICKED Player')
      },
      this
    )
  }

  update(dt: number) {
    this.stateMachine?.update(dt)

    if (this.keyInputs['tab'].isDown && !this.tabKeyPressed) {
      this.toggleInventory(this.showInventory)
      this.showInventory = !this.showInventory
      this.tabKeyPressed = true
    } else if (this.keyInputs['tab'].isUp) {
      this.tabKeyPressed = false
    }
  }

  moveAlong(path: Phaser.Math.Vector2[]) {
    if (path == undefined || path.length <= 0) {
      return
    }

    this.movePath = path
    this.moveTo(this.movePath.shift()!)
  }

  moveTo(target: Phaser.Math.Vector2) {
    this.moveToTarget = target
  }

  initEvents() {
    this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this)
  }

  private createKeyInputs() {
    this.keyInputs['keyW'] = this.scene.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.W)
    this.keyInputs['keyS'] = this.scene.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.S)
    this.keyInputs['keyA'] = this.scene.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.A)
    this.keyInputs['keyD'] = this.scene.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.D)
    this.keyInputs['keyE'] = this.scene.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.E)

    this.keyInputs['tab'] = this.scene.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.TAB)
  }

  private createStateMachine(): void {
    this.stateMachine = new StateMachine(this, 'player')

    this.stateMachine
      .addState(playerStates.idle, {
        onEnter: this.idleOnEnter,
        onUpdate: this.idleOnUpdate,
      })
      .addState(playerStates.walk, {
        onEnter: this.walkOnEnter,
        onUpdate: this.walkOnUpdate,
      })
      .setState(playerStates.idle)
  }

  private idleOnEnter(): void {
    // this.anims.play(playerAnims.walkDown)
  }

  private idleOnUpdate(): void {
    if (
      this.keyInputs['keyD'].isDown ||
      this.keyInputs['keyA'].isDown ||
      this.keyInputs['keyW'].isDown ||
      this.keyInputs['keyS'].isDown
    ) {
      this.stateMachine?.setState(playerStates.walk)
    }
  }

  private walkOnEnter(): void {
    // if(this.keyInputs['keyD'].isDown)
    //   this.anims.play(playerAnims.walkRight)
    // else if(this.keyInputs['keyA'].isDown)
    //   this.anims.play(playerAnims.walkLeft)
    // else if(this.keyInputs['keyW'].isDown)
    //   this.anims.play(playerAnims.walkUp)
    // else if(this.keyInputs['keyS'].isDown)
    //   this.anims.play(playerAnims.walkDown)
  }

  private walkOnUpdate(): void {
    this.setVelocity(0)
    this.setDrag(1000)

    if (this.keyInputs['keyD'].isDown) {
      this.setVelocityX(this.speed)
    } else if (this.keyInputs['keyA'].isDown) {
      this.setVelocityX(-this.speed)
    }

    if (this.keyInputs['keyW'].isDown) {
      this.setVelocityY(-this.speed)
    } else if (this.keyInputs['keyS'].isDown) {
      this.setVelocityY(this.speed)
    }

    if (
      this.keyInputs['keyD'].isDown ||
      this.keyInputs['keyA'].isDown ||
      this.keyInputs['keyW'].isDown ||
      this.keyInputs['keyS'].isDown
    ) {
      //Do Nothing
    } else {
      this.stateMachine?.setState(playerStates.idle)
    }
  }

  private drivingOnEnter() {}

  private drivingOnUpdate() {}

  moveToPoint() {
    // PUT THIS IN INIT
    // this.scene.input.on(Phaser.Input.Events.POINTER_UP, (pointer: Phaser.Input.Pointer) => {
    //   const { worldX, worldY } = pointer
    //   const startVec = this.map.getLayers().groundLayer.worldToTileXY(this.x, this.y)
    //   const targetVec = this.map.getLayers().groundLayer.worldToTileXY(worldX, worldY)
    //   const path = findPath(startVec, targetVec, this.map.getLayers().groundLayer, this.map.getLayers().collideLayer)
    //   this.moveAlong(path)
    // })
    // this.scene.events.on(Phaser.Scenes.Events.SHUTDOWN, () => {
    //   this.scene.input.off(Phaser.Input.Events.POINTER_UP)
    // })
    // PUT THIS IN UPDATE
    // let dx = 0
    // let dy = 0
    // if (this.moveToTarget) {
    //   dx = this.moveToTarget.x - this.x
    //   dy = this.moveToTarget.y - this.y
    //   if (Math.abs(dx) < 5) {
    //     dx = 0
    //   }
    //   if (Math.abs(dy) < 5) {
    //     dy = 0
    //   }
    //   if (dx === 0 && dy === 0) {
    //     if (this.movePath.length > 0) {
    //       this.moveTo(this.movePath.shift()!)
    //       return
    //     }
    //     this.moveToTarget = undefined
    //   }
    // }
    // const leftDown = dx < 0
    // const rightDown = dx > 0
    // const upDown = dy < 0
    // const downDown = dy > 0
    // if (leftDown)
    // {
    //   this.setVelocity(-this.speed, 0)
    // }
    // else if (rightDown)
    // {
    //   this.setVelocity(this.speed, 0)
    // }
    // else if (upDown)
    // {
    //   this.setVelocity(0, -this.speed)
    // }
    // else if (downDown)
    // {
    //   this.setVelocity(0, this.speed)
    // }
  }
}
