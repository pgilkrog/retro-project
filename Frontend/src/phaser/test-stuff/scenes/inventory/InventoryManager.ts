import type Phaser from 'phaser'
import ContextMenu from './ItemMenu'
import { InventoryItem } from './models/InventoryItem'
import { Item } from './models/Item'

interface IItem {
  name: string
  sprite: Phaser.GameObjects.Image | null  
  description?: string
  amount: number
  maxStack: number  
  width: number
  height: number
}

interface IInventoryItem {
  item: IItem
  row: number
  col: number
  isDragging: boolean,
}

export default class InventoryManger {
  private scene: Phaser.Scene
  private inventoryGrid: InventoryItem[][] = []
  private rows: number
  private cols: number
  private squareSize = 100
  private graphics: Phaser.GameObjects.Graphics | undefined
  private readonly TINT_COLOR = 0x00ff00
  private isDraggingItem: boolean  = false
  private contextMenu: any
  private inventoryContainer: Phaser.GameObjects.Container | undefined
  private x: number
  private y: number

  constructor(scene: Phaser.Scene, x: number, y: number, rows: number, cols: number) {
    this.scene = scene
    this.x = x
    this.y = y
    this.rows = rows
    this.cols = cols
  }

  create() {
    this.scene.input.mouse.disableContextMenu()
    this.graphics = this.scene.add.graphics()
    // Create the inventory container and its contents here
    this.inventoryContainer = this.scene.add.container(this.x, this.y)
    this.contextMenu = new ContextMenu(this, this.scene)

    this.renderGrid()
    this.createItems()
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
          this.removeItemFromGrid(inventoryItem)
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
        
            const isSmallItem = inventoryItem.item.width === 1 && inventoryItem.item.height === 1;
        
            // Calculate the new position based on the pointer
            let newCol = Math.floor(pointer.x / this.squareSize)
            let newRow = Math.floor(pointer.y / this.squareSize)
        
            // Adjust for the parent's position
            newCol -= Math.floor(this.x / this.squareSize)
            newRow -= Math.floor(this.y / this.squareSize)
        
            if (!isSmallItem) {
              // For larger items, adjust the new position based on item width and height
              newCol -= Math.floor((inventoryItem.item.width - 1) / 2)
              newRow -= Math.floor((inventoryItem.item.height - 1) / 2)
            }
        
            const validGridPosition = this.isValidGridPosition(newRow, newCol)
            const isGridOccupied = this.isGridOccupied(newRow, newCol, inventoryItem.item.width, inventoryItem.item.height)
        
            console.log(`old col: ${inventoryItem.col}`,`old row: ${inventoryItem.row}`)
            console.log(`new col: ${newCol}`,`new row: ${newRow}`)
            console.log(`validGridPosition: ${validGridPosition}`, `isGridOccupied: ${isGridOccupied}`)

            if (validGridPosition && !isGridOccupied) {
              console.log("IS MOVING TO NEW POSITION")
              // Move the item to the new grid position
              this.moveItem(inventoryItem, newRow, newCol)
            } else {
              console.log("IS MOVING BACK TO OLD POSITION")
              this.moveItem(inventoryItem, inventoryItem.row, inventoryItem.col)
            }
          }
        });
             
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
    
    inventoryItem.item.sprite?.setPosition(newCol * this.squareSize + (inventoryItem.item.width * this.squareSize) / 2, newRow * this.squareSize + (inventoryItem.item.height * this.squareSize) / 2)

    for (let i = 0; i < inventoryItem.item.height; i++) {
      for (let j = 0; j < inventoryItem.item.width; j++) {
        this.inventoryGrid[oldRow + i][oldCol + j] = new InventoryItem(new Item('', null, '', 1, 1, 0, 0), oldRow, oldCol, false)
      }
    }

    // save the row and col for the item
    inventoryItem.row = newRow
    inventoryItem.col = newCol

    for (let i = 0; i < inventoryItem.item.height; i++) {
      for (let j = 0; j < inventoryItem.item.width; j++) {
        this.inventoryGrid[newRow + i][newCol + j] = inventoryItem
      }
    }
  }

  renderGrid() {
    this.graphics?.clear()

    // Generate the grid, and put empty items in the slots
    for (let i = 0; i < this.rows; i++) {
      this.inventoryGrid[i] = []
      for (let j = 0; j < this.cols; j++) {
        this.inventoryGrid[i][j] = new InventoryItem(new Item('', null, '', 1, 1, 0, 0), -1, -1, false)
      }
    }

    // Create the lines for the grid, to show the slots
    this.inventoryGrid.forEach((row, rowIndex) => {
      row.forEach((_, colIndex) => {
        this.graphics?.lineStyle(1, 0xffffff, 1)
        this.graphics?.strokeRect(this.x + (colIndex * this.squareSize), this.y + (rowIndex * this.squareSize), this.squareSize, this.squareSize)
      })
    })
  }

  createInventoryItem(row: number, col: number, itemName: string, height: number, width: number) {
    // Calculate the offsetX and offsetY based on item size
    const offsetX = (width * this.squareSize) / 2;
    const offsetY = (height * this.squareSize) / 2;
  
    // Calculate the actual position based on the container's position
    const itemX = col * this.squareSize + offsetX;
    const itemY = row * this.squareSize + offsetY;
  
    // Create the actual item for the slot in the grid
    let inventoryItem = {
      item: {
        name: itemName,
        sprite: this.scene.add.image(
          itemX,
          itemY,
          itemName
        ),
        width: width,
        height: height,
        amount: 5,
        maxStack: 10
      },
      col: col,
      row: row,
      isDragging: false
    };
  
    this.inventoryGrid[row][col] = inventoryItem;
    inventoryItem.item.sprite.setInteractive({ draggable: true });
    this.inventoryContainer?.add(inventoryItem.item.sprite);
  }

  removeItemFromInventory(inventoryItem: InventoryItem) {
    // Check if the item exists in the inventory
    if (inventoryItem.row >= 0 && inventoryItem.col >= 0) {
      // Remove the item from the grid
      for (let i = 0; i < inventoryItem.item.height; i++) {
        for (let j = 0; j < inventoryItem.item.width; j++) {
          this.inventoryGrid[inventoryItem.row + i][inventoryItem.col + j] = {
            item: {
              name: '',
              sprite: null,
              width: 1,
              height: 1,
              amount: 0,
              maxStack: 0
            },
            row: -1,
            col: -1,
            isDragging: false,
          };
        }
      }
      // Remove the item's sprite
      if (inventoryItem.item.sprite) {
        inventoryItem.item.sprite.destroy()
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
    const offsetX = (newWidth * this.squareSize) / 2
    const offsetY = (newHeight * this.squareSize) / 2

    inventoryItem.item.sprite?.setPosition(
      oldCol * this.squareSize + offsetX,
      oldRow * this.squareSize + offsetY
    );
  }

  // Function to remove the item from the grid
  removeItemFromGrid(inventoryItem: InventoryItem) {
    for (let i = 0; i < inventoryItem.item.height; i++) {
      for (let j = 0; j < inventoryItem.item.width; j++) {
        this.inventoryGrid[inventoryItem.row + i][inventoryItem.col + j] = new InventoryItem(new Item('', null, '', 1, 1, 0, 0), inventoryItem.row, inventoryItem.col, false)
      }
    }
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
    return row >= 0 && row < this.rows && col >= 0 && col < this.cols
  }

  createItems() {
    this.addItemToGrid(0, 2, 'ball', 1, 1)
    this.addItemToGrid(1, 2, 'ball', 1, 1)
    this.addItemToGrid(0, 3, 'paddle', 1, 2)
    this.addItemToGrid(0, 0, 'bigBox', 2, 2)
    this.addItemToGrid(2, 0, 'largeBox', 4, 2)
  }
}
