import Phaser, { Scene } from 'phaser';

interface InventoryItem {
  name: string;
  sprite: Phaser.GameObjects.Image | null;
  row: number;
  col: number;
}

export default class Game extends Scene {
  private inventoryGrid: InventoryItem[][] = [];
  private gridSize = 5;
  private squareSize = 80;
  private graphics: Phaser.GameObjects.Graphics | undefined;

  constructor() {
    super({ key: 'GameScene' });
  }

  create() {
    this.graphics = this.add.graphics();

    for (let i = 0; i < this.gridSize; i++) {
      this.inventoryGrid[i] = [];
      for (let j = 0; j < this.gridSize; j++) {
        this.inventoryGrid[i][j] = { name: '', sprite: null, row: -1, col: -1 };
      }
    }

    this.addItemToGrid(0, 0, 'ball');
    this.addItemToGrid(1, 1, 'paddle');
    this.addItemToGrid(2, 2, 'ball');

    this.renderGrid();

    // Enable input events for each item's sprite
    this.inventoryGrid.flat().forEach((item: any) => {
      if (item.sprite) {
        item.sprite.setInteractive({ draggable: true });

        item.sprite.on('dragstart', (pointer: Phaser.Input.Pointer) => {
          item.sprite?.setTint(0xff0000);
        });

        item.sprite.on('drag', (pointer: Phaser.Input.Pointer, dragX: number, dragY: number) => {
          item.sprite?.setPosition(dragX, dragY);
        });

        item.sprite.on('dragend', (pointer: Phaser.Input.Pointer, dropped: boolean) => {
          item.sprite?.clearTint();
          if (dropped) {
            const newCol = Math.floor(item.sprite.x / this.squareSize);
            const newRow = Math.floor(item.sprite.y / this.squareSize);

            if (this.isValidGridPosition(newRow, newCol) && !this.isGridOccupied(newRow, newCol)) {
              // Move the item to the new grid position
              this.moveItem(item, newRow, newCol);
            } else {
              this.moveItem(item, item.row, item.col)
            }
          }
        });
      }
    });
  }

  addItemToGrid(row: number, col: number, itemName: string) {
    if (this.isValidGridPosition(row, col) && !this.isGridOccupied(row, col)) {
      this.inventoryGrid[row][col] = {
        name: itemName,
        sprite: this.add.image(
          col * this.squareSize + this.squareSize / 2,
          row * this.squareSize + this.squareSize / 2,
          itemName
        ),
        col: col,
        row: row
      };
    } else {
      console.error('Invalid grid position or position is already occupied.');
    }
  }

  moveItem(item: InventoryItem, newRow: number, newCol: number) {
    const oldRow = Math.floor(item.sprite!.y / this.squareSize);
    const oldCol = Math.floor(item.sprite!.x / this.squareSize);

    item.sprite?.setPosition(newCol * this.squareSize + this.squareSize / 2, newRow * this.squareSize + this.squareSize / 2);

    this.inventoryGrid[oldRow][oldCol] = { name: '', sprite: null, row: -1, col: -1 };
    this.inventoryGrid[newRow][newCol] = item;
    item.col = newCol
    item.row = newRow
  }

  renderGrid() {
    this.graphics?.clear();

    for (let i = 0; i < this.gridSize; i++) {
      for (let j = 0; j < this.gridSize; j++) {
        this.graphics?.lineStyle(2, 0xffffff, 1);
        this.graphics?.strokeRect(j * this.squareSize, i * this.squareSize, this.squareSize, this.squareSize);
      }
    }
  }

  isValidGridPosition(row: number, col: number): boolean {
    return row >= 0 && row < this.gridSize && col >= 0 && col < this.gridSize;
  }

  isGridOccupied(row: number, col: number): boolean {
    return this.inventoryGrid[row][col].name !== '';
  }
}
