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
  private gridSize = 5
  private squareSize = 60
  private graphics: Phaser.GameObjects.Graphics | undefined
  private readonly TINT_COLOR = 0xff0000

  constructor() {
    super({ key: 'GameScene' })
  }

  create() {
    this.graphics = this.add.graphics()

    for (let i = 0; i < this.gridSize; i++) {
      this.inventoryGrid[i] = []
      for (let j = 0; j < this.gridSize; j++) {
        this.inventoryGrid[i][j] = { name: '', sprite: null, row: -1, col: -1, width: 1, height: 1 }
      }
    }

    this.addItemToGrid(0, 0, 'ball', 1, 1);
    this.addItemToGrid(1, 1, 'paddle', 1, 2); 
    this.addItemToGrid(2, 2, 'ball', 1, 1);
    // this.addItemToGrid(2, 2, 'bogBox', 2, 2);

    this.renderGrid();

    // Enable input events for each item's sprite
    this.inventoryGrid.flat().forEach((item: IInventoryItem) => {
      if (item.sprite) {
        item.sprite.setInteractive({ draggable: true })

        item.sprite.on('dragstart', (pointer: Phaser.Input.Pointer) => {
          item.sprite?.setTint(this.TINT_COLOR);
        })

        item.sprite.on('drag', (pointer: Phaser.Input.Pointer, dragX: number, dragY: number) => {
          item.sprite?.setPosition(dragX, dragY)
        })

        item.sprite.on('dragend', (pointer: Phaser.Input.Pointer, dropped: boolean) => {
          item.sprite?.clearTint()
          if (dropped) {
            const newCol = Math.floor(item.sprite!.x / this.squareSize)
            const newRow = Math.floor(item.sprite!.y / this.squareSize)

            if (this.isValidGridPosition(newRow, newCol) && !this.isGridOccupied(newRow, newCol, item.width, item.height)) {
              // Move the item to the new grid position
              this.moveItem(item, newRow, newCol)
            } else {
              this.moveItem(item, item.row, item.col)
            }
          }
        });
      }
    });
  }

  addItemToGrid(row: number, col: number, itemName: string, width: number, height: number) {
    if (this.isValidGridPosition(row, col) && !this.isGridOccupied(row, col, width, height)) {
      // Offset to place the item between two grid cells
      const offsetX = (width * this.squareSize) / 2
      const offsetY = (height * this.squareSize) / 2

      // Check if the item is already present in the specified position
      if (!this.inventoryGrid[row][col].sprite) {
        // Create only one sprite for the entire item
        this.createItem(row, col, itemName, offsetX, offsetY, height, width)
      }
    } else {
      console.error(`Invalid grid position or position is already occupied.`)
    }
  }

  moveItem(item: IInventoryItem, newRow: number, newCol: number) {
    const oldRow = item.row
    const oldCol = item.col

    item.sprite?.setPosition(newCol * this.squareSize + (item.width * this.squareSize) / 2, newRow * this.squareSize + (item.height * this.squareSize) / 2)

    for (let i = 0; i < item.height; i++) {
      for (let j = 0; j < item.width; j++) {
        this.inventoryGrid[oldRow + i][oldCol + j] = { name: '', sprite: null, row: -1, col: -1, width: 1, height: 1 }
      }
    }

    item.row = newRow;
    item.col = newCol;

    for (let i = 0; i < item.height; i++) {
      for (let j = 0; j < item.width; j++) {
        this.inventoryGrid[newRow + i][newCol + j] = item;
      }
    }
  }

  renderGrid() {
    this.graphics?.clear()
    
    this.inventoryGrid.forEach((row, rowIndex) => {
      row.forEach((_, colIndex) => {
        this.graphics?.lineStyle(2, 0xffffff, 1)
        this.graphics?.strokeRect(colIndex * this.squareSize, rowIndex * this.squareSize, this.squareSize, this.squareSize)
      })
    })
  }

  private createItem(row: number, col: number, itemName: string, offsetX: number, offsetY: number, height: number, width: number) {
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
    }
  }

  isValidGridPosition(row: number, col: number): boolean {
    return row >= 0 && row < this.gridSize && col >= 0 && col < this.gridSize
  }

  isGridOccupied(startRow: number, startCol: number, width: number, height: number): boolean {
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
}
