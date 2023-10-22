import type Phaser from 'phaser'
import ContextMenu from './ItemMenu'
import { InventoryItem } from './models/InventoryItem'
import { Item } from './models/Item'
import type { inventoryTypes } from './models/Enums'
import {ItemsManager} from './ItemManager'

export default class InventoryManger {
  private inventoryType: inventoryTypes
  private scene: Phaser.Scene
  private inventoryGrid: InventoryItem[][] = []
  private rows: number
  private cols: number
  private squareSize = 100
  private graphics: Phaser.GameObjects.Graphics | undefined
  private isDraggingItem: boolean  = false
  private contextMenu: any
  private inventoryContainer: Phaser.GameObjects.Container | undefined
  private x: number
  private y: number
  private itemsManager

  // Set Colors 
  private readonly TINT_COLOR: number = 0x00FF00
  private readonly WHITE_COLOR: string = '#FFFFFF'
  private readonly FONT_COLOR: string = '#000000'

  constructor(invOwner: inventoryTypes, scene: Phaser.Scene, x: number, y: number, rows: number, cols: number) {
    this.inventoryType = invOwner
    this.scene = scene
    this.x = x
    this.y = y
    this.rows = rows
    this.cols = cols
    this.inventoryGrid = new Array(rows).fill([]).map(() =>
      new Array(cols).fill(
        new InventoryItem(
          new Item('', null, '', 1, 1, 0, null),
          -1,
          -1,
          false,
          0
        )
      )
    )
    this.itemsManager = new ItemsManager(this.scene)
  }

  create() {
    // Disable the browsers right click menu
    this.scene.input.mouse.disableContextMenu()
    
    this.graphics = this.scene.add.graphics()
    // Create the inventory container and its contents here
    this.inventoryContainer = this.scene.add.container(this.x, this.y)
    this.contextMenu = new ContextMenu(this, this.scene, this.inventoryType)

    this.renderGrid()
    // Add a keyboard event listener for the 'r' key press
    this.scene.input.keyboard.on('keydown-R', () => {
      if (this.isDraggingItem) {
        // Get the currently dragged item and rotate it
        const draggedItem = this.inventoryGrid.flat().find((inventoryItem: InventoryItem) => inventoryItem.item.sprite && inventoryItem.isDragging)
        if (draggedItem) {
          this.rotateItem(draggedItem)
        }
      }
    })
  }

  addItemToGrid(row: number, col: number, item: Item, amount: number) {
    if (this.isValidGridPosition(row, col) && !this.isGridOccupied(row, col, item.width, item.height)) {
      // Check if the item is already present in the specified position
      if (!this.inventoryGrid[row][col].item.sprite) {
        // Create only one sprite for the entire item
        this.createInventoryItem(row, col, item, amount)
  
        // Mark the occupied positions
        for (let i = 0; i < item.height; i++) {
          for (let j = 0; j < item.width; j++) {
            this.inventoryGrid[row + i][col + j] = this.inventoryGrid[row][col]
          }
        }
      }
    } else {
      console.error(`Invalid grid position or position is already occupied for ${item.name}.`)
    }
  }

  moveItem(inventoryItem: InventoryItem, newRow: number, newCol: number) {
    const { row, col } = inventoryItem
    const { sprite, text, height, width } = inventoryItem.item

    const { offsetX, offsetY } = this.createOffsets(height, width)

    const newX = newCol * this.squareSize + offsetX
    const newY = newRow * this.squareSize + offsetY
    
    text?.setPosition(newX + offsetX - 30, newY + offsetY - 30)
    sprite?.setPosition(newX, newY)

    this.clearGridOccupied(height, width, col, row)

    // save the new row and col for the item
    inventoryItem.row = newRow
    inventoryItem.col = newCol

    this.setGridOccupied(height, width, newCol, newRow, inventoryItem)
  }

  renderGrid() {
    this.graphics?.clear()

    // Add text to be displayed on top of inventory
    this.scene.add.text(this.x + 10, this.y - 50, this.inventoryType) 
      .setFont('32px Arial')
      .setStroke(this.WHITE_COLOR, 2)
      .setColor(this.FONT_COLOR)

    // Create a border for each row and col in inventory grid
    this.inventoryGrid.forEach((row, rowIndex) => {
      row.forEach((_, colIndex) => {
        this.graphics?.lineStyle(1, 0xffffff, 1)
        this.graphics?.strokeRect(this.x + (colIndex * this.squareSize), this.y + (rowIndex * this.squareSize), this.squareSize, this.squareSize)
      })
    })
  }

  createInventoryItem(row: number, col: number, item: Item, amount: number) {
    // Calculate the offsetX and offsetY based on item size
    const { offsetX, offsetY } = this.createOffsets(item.height, item.width)
  
    // Calculate the actual position based on the container's position
    const itemX = col * this.squareSize + offsetX
    const itemY = row * this.squareSize + offsetY
  
    // Create the actual item for the slot in the grid
    let inventoryItem = {
      item: {
        name: item.name,
        sprite: item.sprite,
        width: item.width,
        height: item.height,
        maxStack: item.maxStack,
        description: item.description,
        text: item.text
      },
      col: col,
      row: row,
      isDragging: false,
      amount: amount
    }

    inventoryItem.item.text?.setPosition(itemX + offsetX - 50, itemY + offsetY - 30).setText('x'+amount.toString())
    inventoryItem.item.sprite?.setPosition(itemX, itemY)
  
    this.inventoryGrid[row][col] = inventoryItem
    this.initActions(inventoryItem)
    inventoryItem.item.sprite?.setInteractive({ draggable: true })
    this.inventoryContainer?.add(inventoryItem.item.text!)
    this.inventoryContainer?.add(inventoryItem.item.sprite!)
    this.inventoryContainer?.bringToTop(inventoryItem.item.text!)
  }

  addItemToInventory(item: Item, amount: number) {
    // Iterate through the grid to find an available spot
    for (let row = 0; row < this.rows - item.height + 1; row++) {
      for (let col = 0; col < this.cols - item.width + 1; col++) {
        // Check if the spot is available
        if (!this.isGridOccupied(row, col, item.width, item.height)) {
          // Add the item to the inventory grid at this position
          this.addItemToGrid(row, col, item, amount)
          return // Exit the loop after placing the item
        }
      }
    }
  
    // If no available spot was found, throw error
    console.error(`No available spot found for ${item.name}.`)
  }

  removeItemFromInventory(props: any) {
    if (props.inventoryItem.row >= 0 && props.inventoryItem.col >= 0) {
      if(props.inventoryItem.amount <= props.amount) {
        this.clearGridOccupied(props.inventoryItem.item.height, props.inventoryItem.item.width, props.inventoryItem.col, props.inventoryItem.row)  
        
        // Check if sprite exists and destroy the sprite
        if (props.inventoryItem.item.sprite) 
          props.inventoryItem.item.sprite.destroy()
        if (props.inventoryItem.item.text) 
          props.inventoryItem.item.text?.destroy()
              
      } else {
        props.inventoryItem.amount -= props.amount
        if (props.inventoryItem.amount > 1)
        props.inventoryItem.item.text?.setText('x'+ props.inventoryItem.amount)
        else {   
          props.inventoryItem.item.text?.destroy()
        }
      }
    }
  }

  rotateItem(inventoryItem: InventoryItem) {
    const { height, width } = inventoryItem.item

    const oldRow = inventoryItem.row
    const oldCol = inventoryItem.col
  
    // Calculate the new width and height after rotation
    const newWidth = height
    const newHeight = width
  
    // Update the item's width and height
    inventoryItem.item.width = newWidth
    inventoryItem.item.height = newHeight
  
    // Rotate the item's sprite by 90 degrees
    inventoryItem.item.sprite?.setAngle(inventoryItem.item.sprite.angle + 90)
  
    // Calculate the new position of the item's sprite to keep it centered while rotating
    const { offsetX, offsetY } = this.createOffsets(height, width)

    inventoryItem.item.sprite?.setPosition(
      oldCol * this.squareSize + offsetX,
      oldRow * this.squareSize + offsetY
    )
  }

  checkItemInInventory(itemName: string, amount: number) {
    for (let row = 0; row < this.inventoryGrid.length; row++) {
      for (let col = 0; col < this.inventoryGrid[0].length; col++) {
        const inventoryItem = this.inventoryGrid[row][col]

        if (inventoryItem.item.name === itemName && inventoryItem.amount < inventoryItem.item.maxStack) {
          // Calculate the remaining amount
          const remaining = inventoryItem.amount + amount - inventoryItem.item.maxStack
          if (remaining > 0) {
            inventoryItem.amount = inventoryItem.item.maxStack
            inventoryItem.item.text?.setText('x' + inventoryItem.amount)
            this.checkItemInInventory(inventoryItem.item.name, remaining)
          } else {
            inventoryItem.amount += amount
            inventoryItem.item.text?.setText('x' + inventoryItem.amount.toString())
          }

          return
        }
      }
    }

    const newItem = this.itemsManager.getItem(itemName)
    if (amount <= 0 || newItem == undefined) return

    if (newItem.maxStack > amount)
      this.addItemToInventory(newItem, amount)
    else {
      this.addItemToInventory(newItem, newItem.maxStack)
      if (amount - newItem.maxStack > 0)
        this.checkItemInInventory(newItem.name, amount - newItem.maxStack)
    }
  }


  isGridOccupied(startRow: number, startCol: number, width: number, height: number): boolean {
    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        const newRow = startRow + i
        const newCol = startCol + j
        if (!this.isValidGridPosition(newRow, newCol) || this.inventoryGrid[newRow][newCol].item.name !== '') {
          return true
        }
      }
    }
    return false
  }


  isValidGridPosition(row: number, col: number): boolean {
    return row >= 0 && row < this.rows && col >= 0 && col < this.cols
  }

  clearGridOccupied(height: number, width: number, col: number, row: number) {
    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        this.inventoryGrid[row + i][col + j] = new InventoryItem(new Item('', null, '', 1, 1, 0, null), row, col, false, 0)
      }
    }
  }

  setGridOccupied(height: number, width: number, col: number, row: number, inventoryItem: InventoryItem) {
    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        this.inventoryGrid[row + i][col + j] = inventoryItem
      }
    }
  }

  createOffsets(height: number, width: number) {
    return {
      offsetX: (width * this.squareSize) / 2,
      offsetY: (height * this.squareSize) / 2
    } 
  }

  initActions(inventoryItem: InventoryItem) {
    const { sprite, text, height, width } = inventoryItem.item

    if (sprite) {
      // Listen for the right mouse button down event
      sprite.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
        if (pointer.rightButtonDown()) {
          this.contextMenu.showMenu({x: pointer.x, y: pointer.y}, inventoryItem)
          // Prevent the default behavior to avoid the browser's context menu
          pointer.event.preventDefault()
        }
      })

      sprite.on('dragstart', (pointer: Phaser.Input.Pointer) => {
        sprite?.setDepth(99)
        sprite?.setTint(this.TINT_COLOR)
        inventoryItem.isDragging = true
        this.isDraggingItem = true

        // Clears the item from the grid when its being dragged
        this.clearGridOccupied(height, width, inventoryItem.col, inventoryItem.row)
      })

      sprite.on('drag', (pointer: Phaser.Input.Pointer, dragX: number, dragY: number) => {
        const { offsetX, offsetY } = this.createOffsets(height, width)
        
        text?.setPosition(dragX + offsetX - 30, dragY + offsetY - 30)
        sprite?.setPosition(dragX, dragY)
      })

      sprite.on('dragend', (pointer: Phaser.Input.Pointer, dropped: boolean) => {
        if (dropped) {
          sprite?.clearTint()
          this.isDraggingItem = false
          inventoryItem.isDragging = false
          sprite?.setDepth(0)
      
          const isSmallItem = (width === 1 && height === 1)

          let newCol = Math.floor(pointer.x / this.squareSize) - Math.floor(this.x / this.squareSize)
          let newRow = Math.floor(pointer.y / this.squareSize) - Math.floor(this.y / this.squareSize)

          if (!isSmallItem) {
            // For larger items, adjust the new position based on item width and height
            newCol -= Math.floor((width - 1) / 2)
            newRow -= Math.floor((height - 1) / 2)
          }
      
          const validGridPosition = this.isValidGridPosition(newRow, newCol)
          const isGridOccupied = this.isGridOccupied(newRow, newCol, width, height)
      
          if (validGridPosition && !isGridOccupied) {
            console.log("IS MOVING TO NEW POSITION")
            // Move the item to the new grid position
            this.moveItem(inventoryItem, newRow, newCol)
          } else {
            console.log("IS MOVING BACK TO OLD POSITION")
            this.moveItem(inventoryItem, inventoryItem.row, inventoryItem.col)
          }
        }
      })
    }
  }
}
