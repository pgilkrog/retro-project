import type Phaser from 'phaser'
import ContextMenu from './ItemMenu'
import { InventoryItem } from './InventoryItem'
import { Item } from './Item'

interface IItem {
  name: string
  sprite: Phaser.GameObjects.Image | null  
  description?: string
}

interface IInventoryItem {
  item: IItem
  row: number
  col: number
  width: number
  height: number
  isDragging: boolean,
  amount: number,
  maxStack: number
}

export default class InventoryManger {
  private scene: Phaser.Scene
  private inventoryGrid: InventoryItem[][] = []
  private gridWidth = 4
  private gridHeight = 8
  private squareSize = 100
  private graphics: Phaser.GameObjects.Graphics | undefined
  private readonly TINT_COLOR = 0x00ff00
  private isDraggingItem: boolean  = false
  private contextMenu: any

  constructor(scene: Phaser.Scene) {
    console.log("INVEMTORUY CREATED")
    this.scene = scene
  }

  create() {
    console.log("CREATED")
    this.scene.input.mouse.disableContextMenu()
    this.graphics = this.scene.add.graphics()
    this.renderGrid()
    this.createItems()
    this.contextMenu = new ContextMenu(this, this.scene)

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

    // Add a pointerdown event listener to each item
    this.inventoryGrid.flat().forEach((inventoryItem: IInventoryItem) => {
      if (inventoryItem.item.sprite) {
        // Listen for the right mouse button down event
        inventoryItem.item.sprite.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
          if (pointer.rightButtonDown()) {
            this.contextMenu.showMenu(pointer.x, pointer.y, inventoryItem)
            // Prevent the default behavior to avoid the browser's context menu
            pointer.event.preventDefault()
          }
        })
      }
    })

    // Enable input events for each item's sprite
    this.inventoryGrid.flat().forEach((inventoryItem: InventoryItem) => {
      if (inventoryItem.item.sprite) {
        inventoryItem.item.sprite.on('dragstart', (pointer: Phaser.Input.Pointer) => {
          inventoryItem.item.sprite?.setDepth(1)
          inventoryItem.item.sprite?.setTint(this.TINT_COLOR)
          inventoryItem.isDragging = true
          this.isDraggingItem = true
        })

        inventoryItem.item.sprite.on('drag', (pointer: Phaser.Input.Pointer, dragX: number, dragY: number) => {
          if (inventoryItem.item.sprite === null) return
          inventoryItem.item.sprite.setPosition(dragX, dragY)
        })

        inventoryItem.item.sprite.on('dragend', (pointer: Phaser.Input.Pointer, dropped: boolean) => {
          inventoryItem.item.sprite?.clearTint()
          if (dropped) {
            this.isDraggingItem = false
            inventoryItem.isDragging = false
            inventoryItem.item.sprite?.setDepth(0)
            if (inventoryItem.width === 1 && inventoryItem.height === 1) {
              // For 1x1 items, use the existing placement logic
              const newCol = Math.floor(inventoryItem.item.sprite!.x / this.squareSize)
              const newRow = Math.floor(inventoryItem.item.sprite!.y / this.squareSize)
        
              if (
                this.isValidGridPosition(newRow, newCol) &&
                !this.isGridOccupied(newRow, newCol, inventoryItem.width, inventoryItem.height)
              ) {
                // Move the item to the new grid position
                this.moveItem(inventoryItem, newRow, newCol)
              } else {
                this.moveItem(inventoryItem, inventoryItem.row, inventoryItem.col)
              }
            } else {
              // For larger items, use the new placement logic
              const relativeX = pointer.x - inventoryItem.item.sprite!.x
              const relativeY = pointer.y - inventoryItem.item.sprite!.y
        
              const newCol = Math.floor((inventoryItem.col + relativeX / this.squareSize) + 0.5)
              const newRow = Math.floor((inventoryItem.row + relativeY / this.squareSize) + 0.5)
        
              if (
                this.isValidGridPosition(newRow, newCol) &&
                !this.isGridOccupied(newRow, newCol, inventoryItem.width, inventoryItem.height)
              ) {
                // Move the item to the new grid position
                this.moveItem(inventoryItem, newRow, newCol)
              } else {
                this.moveItem(inventoryItem, inventoryItem.row, inventoryItem.col)
              }
            }
          }
        })
      }
    })
  }

  addItemToGrid(row: number, col: number, itemName: string, width: number, height: number) {
    if (this.isValidGridPosition(row, col) && !this.isGridOccupied(row, col, width, height)) {
      // Check if the item is already present in the specified position
      if (!this.inventoryGrid[row][col].item.sprite) {
        // Create only one sprite for the entire item
        this.createInventoryItem(row, col, itemName, height, width)
  
        // Mark the occupied positions
        for (let i = 0; i < height; i++) {
          for (let j = 0; j < width; j++) {
            this.inventoryGrid[row + i][col + j] = this.inventoryGrid[row][col]
          }
        }
      }
    } else {
      console.error(`Invalid grid position or position is already occupied for ${itemName}.`)
    }
  }

  moveItem(inventoryItem: InventoryItem, newRow: number, newCol: number) {
    // set old row and col, 
    const oldRow = inventoryItem.row
    const oldCol = inventoryItem.col
    
    inventoryItem.item.sprite?.setPosition(newCol * this.squareSize + (inventoryItem.width * this.squareSize) / 2, newRow * this.squareSize + (inventoryItem.height * this.squareSize) / 2)

    for (let i = 0; i < inventoryItem.height; i++) {
      for (let j = 0; j < inventoryItem.width; j++) {
        this.inventoryGrid[oldRow + i][oldCol + j] = new InventoryItem(new Item('', null, ''), oldRow, oldCol, 1, 1, false, 0, 0)
      }
    }

    // save the row and col for the item
    inventoryItem.row = newRow
    inventoryItem.col = newCol

    for (let i = 0; i < inventoryItem.height; i++) {
      for (let j = 0; j < inventoryItem.width; j++) {
        this.inventoryGrid[newRow + i][newCol + j] = inventoryItem
      }
    }
  }

  renderGrid() {
    this.graphics?.clear()

    // Generate the grid, and put empty items in the slots
    for (let i = 0; i < this.gridWidth; i++) {
      this.inventoryGrid[i] = []
      for (let j = 0; j < this.gridHeight; j++) {
        this.inventoryGrid[i][j] = new InventoryItem(new Item('', null, ''), -1, -1, 1, 1, false, 0, 0)
      }
    }
    
    // Create the lines for the grid, to show the slots
    this.inventoryGrid.forEach((row, rowIndex) => {
      row.forEach((_, colIndex) => {
        this.graphics?.lineStyle(1, 0xffffff, 1)
        this.graphics?.strokeRect(colIndex * this.squareSize, rowIndex * this.squareSize, this.squareSize, this.squareSize)
      })
    })
  }

  private createInventoryItem(row: number, col: number, itemName: string, height: number, width: number) {
    // Calculate the offsetX and offsetY based on item size
    const offsetX = (width * this.squareSize) / 2
    const offsetY = (height * this.squareSize) / 2
  
    // Create the actual item for the slot in the grid
    let inventoryItem = {
      item: {
        name: itemName,
        sprite: this.scene.add.image(
          col * this.squareSize + offsetX,
          row * this.squareSize + offsetY,
          itemName
        )
      },
      col: col,
      row: row,
      width: width,
      height: height,
      isDragging: false,
      amount: 5,
      maxStack: 10
    }
    this.inventoryGrid[row][col] = inventoryItem

    inventoryItem.item.sprite.setInteractive({ draggable: true })
  }

  // Add this method to your Game class
  removeItemFromInventory(inventoryItem: InventoryItem) {
    // Check if the item exists in the inventory
    if (inventoryItem.row >= 0 && inventoryItem.col >= 0) {
      // Remove the item from the grid
      for (let i = 0; i < inventoryItem.height; i++) {
        for (let j = 0; j < inventoryItem.width; j++) {
          this.inventoryGrid[inventoryItem.row + i][inventoryItem.col + j] = {
            item: {
              name: '',
              sprite: null
            },
            row: -1,
            col: -1,
            width: 1,
            height: 1,
            isDragging: false,
            amount: 0,
            maxStack: 0
          };
        }
      }
      // Remove the item's sprite
      if (inventoryItem.item.sprite) {
        inventoryItem.item.sprite.destroy();
      }
    }
  }

  rotateItem(inventoryItem: InventoryItem) {
    const { height, width } = inventoryItem;
    const oldRow = inventoryItem.row
    const oldCol = inventoryItem.col
  
    // Calculate the new width and height after rotation
    const newWidth = height
    const newHeight = width
  
    // Update the item's width and height
    inventoryItem.width = newWidth
    inventoryItem.height = newHeight
  
    // Rotate the item's sprite by 90 degrees
    inventoryItem.item.sprite?.setAngle(inventoryItem.item.sprite.angle + 90)
  
    // Calculate the new position of the item's sprite to keep it centered while rotating
    const offsetX = (newWidth * this.squareSize) / 2
    const offsetY = (newHeight * this.squareSize) / 2
    inventoryItem.item.sprite?.setPosition(
      oldCol * this.squareSize + offsetX,
      oldRow * this.squareSize + offsetY
    );
  }

  isGridOccupied(startRow: number, startCol: number, width: number, height: number): boolean {
    // Iterate throug the grid to check if occupied
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
    return row >= 0 && row < this.gridWidth && col >= 0 && col < this.gridHeight
  }

  createItems() {
    this.addItemToGrid(0, 2, 'ball', 1, 1)
    this.addItemToGrid(1, 2, 'ball', 1, 1)
    this.addItemToGrid(0, 3, 'paddle', 1, 2)
    this.addItemToGrid(0, 0, 'bigBox', 2, 2)
    this.addItemToGrid(2, 0, 'largeBox', 4, 2)
  }
}
