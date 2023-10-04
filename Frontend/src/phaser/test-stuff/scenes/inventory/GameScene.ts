import Phaser, { Scene } from 'phaser'

interface IInventoryItem {
  name: string
  sprite: Phaser.GameObjects.Image | null
  row: number
  col: number
  width: number
  height: number
}

export default class Game extends Scene {
  private inventoryGrid: IInventoryItem[][] = []
  private gridWidth = 4
  private gridHeight = 8
  private squareSize = 40
  private graphics: Phaser.GameObjects.Graphics | undefined
  private readonly TINT_COLOR = 0xff0000

  constructor() {
    super({ key: 'GameScene' })
  }

  create() {
    this.graphics = this.add.graphics()
    this.renderGrid()
    this.createItems()

    // Enable input events for each item's sprite
    this.inventoryGrid.flat().forEach((item: IInventoryItem) => {
      if (item.sprite) {
        item.sprite.setInteractive({ draggable: true })

        item.sprite.on('dragstart', (pointer: Phaser.Input.Pointer) => {
          item.sprite?.setTint(this.TINT_COLOR)
          console.log(pointer)
        })

        item.sprite.on('drag', (pointer: Phaser.Input.Pointer, dragX: number, dragY: number) => {
          if(item.sprite === null) return
          item.sprite.setPosition(dragX, dragY)
          // console.log(`dragX: ${dragX} dragY: ${dragY}`)
        })

        item.sprite.on('dragend', (pointer: Phaser.Input.Pointer, dropped: boolean) => {
          item.sprite?.clearTint()
          if (dropped) {
            if (item.width === 1 && item.height === 1) {
              // For 1x1 items, use the existing placement logic
              const newCol = Math.floor(item.sprite!.x / this.squareSize)
              const newRow = Math.floor(item.sprite!.y / this.squareSize)
        
              if (
                this.isValidGridPosition(newRow, newCol) &&
                !this.isGridOccupied(newRow, newCol, item.width, item.height)
              ) {
                // Move the item to the new grid position
                this.moveItem(item, newRow, newCol)
              } else {
                this.moveItem(item, item.row, item.col)
              }
            } else {
              // For larger items, use the new placement logic
              const relativeX = pointer.x - item.sprite!.x
              const relativeY = pointer.y - item.sprite!.y
        
              const newCol = Math.floor((item.col + relativeX / this.squareSize) + 0.5)
              const newRow = Math.floor((item.row + relativeY / this.squareSize) + 0.5)
        
              if (
                this.isValidGridPosition(newRow, newCol) &&
                !this.isGridOccupied(newRow, newCol, item.width, item.height)
              ) {
                // Move the item to the new grid position
                this.moveItem(item, newRow, newCol)
              } else {
                this.moveItem(item, item.row, item.col)
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
      if (!this.inventoryGrid[row][col].sprite) {
        // Create only one sprite for the entire item
        this.createItem(row, col, itemName, height, width)
  
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

  moveItem(item: IInventoryItem, newRow: number, newCol: number) {
    // set old row and col, 
    const oldRow = item.row
    const oldCol = item.col
    
    item.sprite?.setPosition(newCol * this.squareSize + (item.width * this.squareSize) / 2, newRow * this.squareSize + (item.height * this.squareSize) / 2)

    for (let i = 0; i < item.height; i++) {
      for (let j = 0; j < item.width; j++) {
        this.inventoryGrid[oldRow + i][oldCol + j] = { name: '', sprite: null, row: oldRow, col: oldCol, width: 1, height: 1 }
      }
    }

    // save the row and col for the item
    item.row = newRow
    item.col = newCol

    for (let i = 0; i < item.height; i++) {
      for (let j = 0; j < item.width; j++) {
        this.inventoryGrid[newRow + i][newCol + j] = item;
      }
    }
  }

  renderGrid() {
    this.graphics?.clear()

    // Generate the grid, and put empty items in the slots
    for (let i = 0; i < this.gridWidth; i++) {
      this.inventoryGrid[i] = []
      for (let j = 0; j < this.gridHeight; j++) {
        this.inventoryGrid[i][j] = { name: '', sprite: null, row: -1, col: -1, width: 1, height: 1 }
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

  private createItem(row: number, col: number, itemName: string, height: number, width: number) {
    // Calculate the offsetX and offsetY based on item size
    const offsetX = (width * this.squareSize) / 2;
    const offsetY = (height * this.squareSize) / 2;
  
    // Create the actual item for the slot in the grid
    this.inventoryGrid[row][col] = {
      name: itemName,
      sprite: this.add.image(
        col * this.squareSize + offsetX,
        row * this.squareSize + offsetY,
        itemName
      ),
      col: col,
      row: row,
      width: width,
      height: height,
    };
  }

  isGridOccupied(startRow: number, startCol: number, width: number, height: number): boolean {
    // Iterate throug the grid to check if occupied
    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        const newRow = startRow + i
        const newCol = startCol + j
        if (!this.isValidGridPosition(newRow, newCol) || this.inventoryGrid[newRow][newCol].name !== '') {
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
