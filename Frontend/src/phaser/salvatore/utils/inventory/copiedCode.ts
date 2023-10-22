// import type Phaser from 'phaser'
// import ContextMenu from './ItemMenu'
// import { InventoryItem } from './models/InventoryItem'
// import { Item } from './models/Item'
// import type { inventoryTypes } from './models/Enums'
// import { ItemsManager } from './ItemManager'

// export default class InventoryManager {
//   private inventoryType: inventoryTypes 
//   private scene: Phaser.Scene 
//   private inventoryGrid: InventoryItem[][]
//   private squareSize: number = 100
//   private graphics: Phaser.GameObjects.Graphics | undefined = undefined
//   private isDraggingItem: boolean = false
//   private contextMenu: ContextMenu | undefined = undefined
//   private inventoryContainer: Phaser.GameObjects.Container | undefined = undefined
//   private x: number
//   private y: number
//   private itemsManager: ItemsManager

//   // Set Colors 
//   private readonly TINT_COLOR: number = 0x00FF00
//   private readonly WHITE_COLOR: string = '#FFFFFF'
//   private readonly FONT_COLOR: string = '#000000'

//   constructor(
//     inventoryType: inventoryTypes,
//     scene: Phaser.Scene,
//     x: number,
//     y: number,
//     rows: number,
//     cols: number
//   ) {
//     this.inventoryType = inventoryType
//     this.scene = scene
//     this.x = x
//     this.y = y
    
//     //  Create an array of rows filled with empty arrays
//     this.inventoryGrid = new Array(rows).fill([]).map(() =>
//       new Array(cols).fill(
//         new InventoryItem(
//           new Item('', null, '', 1, 1, 0, null),
//           -1,
//           -1,
//           false,
//           0
//         )
//       )
//     )
//     this.itemsManager = new ItemsManager(this.scene)
//   }

//   create() {
//     // Disable browsers right click menu
//     this.scene.input.mouse.disableContextMenu()

//     this.graphics = this.scene.add.graphics()
//     this.inventoryContainer = this.scene.add.container(this.x, this.y)
//     this.contextMenu = new ContextMenu(this, this.scene, this.inventoryType)

//     this.renderGrid()

//     // Set up input listener for key R, for rotating items
//     this.scene.input.keyboard.on('keydown-R', () => {
//       if (this.isDraggingItem) {
//         const draggedItem = this.inventoryGrid
//           .flat()
//           .find((inventoryItem: InventoryItem) =>
//             inventoryItem.item.sprite && inventoryItem.isDragging
//           )
//         if (draggedItem) {
//           this.rotateItem(draggedItem)
//         }
//       }
//     })
//   }

//   addItemToGrid(row: number, col: number, item: Item, amount: number) {
//     if (
//       this.isValidGridPosition(row, col) &&
//       !this.isGridOccupied(row, col, item.width, item.height)
//     ) {
//       if (!this.inventoryGrid[row][col].item.sprite) {
//         this.createInventoryItem(row, col, item, amount)
//         this.markGridOccupied(row, col, item.width, item.height)
//       }
//     } else {
//       console.error(
//         `Invalid grid position or position is already occupied for ${item.name}.`
//       )
//     }
//   }

//   moveItem(inventoryItem: InventoryItem, newRow: number, newCol: number) {
//     // Save old row and col values, to set item back if grid position is not valid
//     const oldRow = inventoryItem.row
//     const oldCol = inventoryItem.col

//     const {offsetX, offsetY } =  this.createOffsets(inventoryItem.item.height, inventoryItem.item.width)

//     const newX = newCol * this.squareSize + offsetX
//     const newY = newRow * this.squareSize + offsetY

//     inventoryItem.item.text?.setPosition(newX + offsetX - 30, newY + offsetY - 30)
//     inventoryItem.item.sprite?.setPosition(newX, newY)

//     this.clearGridOccupied(oldRow, oldCol, inventoryItem.item.width, inventoryItem.item.height)

//     inventoryItem.row = newRow
//     inventoryItem.col = newCol

//     this.markGridOccupied(newRow, newCol, inventoryItem.item.width, inventoryItem.item.height)
//   }

//   renderGrid() {
//     this.graphics?.clear()

//     // Add text to display on top of the inventory
//     this.scene
//       .add
//       .text(this.x + 10, this.y - 50, this.inventoryType)
//       .setFont('32px Arial')
//       .setStroke(this.WHITE_COLOR, 2)
//       .setColor(this.FONT_COLOR)

//     // Create a border for each place in the inventory grid
//     this.inventoryGrid.forEach((row, rowIndex) => {
//       row.forEach((_, colIndex) => {
//         this.graphics?.lineStyle(1, 0xffffff, 1)
//         this.graphics?.strokeRect(
//           this.x + colIndex * this.squareSize,
//           this.y + rowIndex * this.squareSize,
//           this.squareSize,
//           this.squareSize
//         )
//       })
//     })
//   }

//   createInventoryItem(row: number, col: number, item: Item, amount: number) {
//     const {offsetX, offsetY } =  this.createOffsets( item.height, item.width)
    
//     const itemX = col * this.squareSize + offsetX
//     const itemY = row * this.squareSize + offsetY

//     // Create an unspecific type as inventoryItem, using create new inventoryItem seems to break the game why?
//     let inventoryItem = {
//       item: { ...item },
//       col: col,
//       row: row,
//       isDragging: false,
//       amount: amount,
//     }

//     inventoryItem.item.text?.setPosition(itemX + offsetX - 50, itemY + offsetY - 30).setText('x' + amount.toString())
//     inventoryItem.item.sprite?.setPosition(itemX, itemY)

//     this.inventoryGrid[row][col] = inventoryItem
//     this.initActions(inventoryItem)
//     inventoryItem.item.sprite?.setInteractive({ draggable: true })
//     this.inventoryContainer?.add(inventoryItem.item.text!)
//     this.inventoryContainer?.add(inventoryItem.item.sprite!)
//     this.inventoryContainer?.bringToTop(inventoryItem.item.text!)
//   }

//   addItemToInventory(item: Item, amount: number) {
//     for (let row = 0; row < this.inventoryGrid.length - item.height + 1; row++) {
//       for (let col = 0; col < this.inventoryGrid[0].length - item.width + 1; col++) {
//         if (!this.isGridOccupied(row, col, item.width, item.height)) {
//           this.addItemToGrid(row, col, item, amount)
//           return
//         }
//       }
//     }

//     console.error(`No available spot found for ${item.name}.`)
//   }

//   removeItemFromInventory(props: any) {
//     if (props.inventoryItem.row >= 0 && props.inventoryItem.col >= 0) {
//       if (props.inventoryItem.amount <= props.amount) {
//         this.clearGridOccupied(props.inventoryItem.row, props.inventoryItem.col, props.inventoryItem.item.width, props.inventoryItem.item.height)

//         if (props.inventoryItem.item.sprite) {
//           props.inventoryItem.item.sprite.destroy()
//           props.inventoryItem.item.text?.destroy()
//         }
//       } else {
//         props.inventoryItem.amount -= props.amount
//         if (props.inventoryItem.amount > 1)
//           props.inventoryItem.item.text?.setText('x' + props.inventoryItem.amount)
//         else {
//           props.inventoryItem.item.text?.destroy()
//         }
//       }
//     }
//   }

//   rotateItem(inventoryItem: InventoryItem) {
//     const oldRow = inventoryItem.row
//     const oldCol = inventoryItem.col
//     const newWidth = inventoryItem.item.height
//     const newHeight = inventoryItem.item.width
//     inventoryItem.item.width = newWidth
//     inventoryItem.item.height = newHeight
//     inventoryItem.item.sprite?.setAngle(inventoryItem.item.sprite.angle + 90)
//     const offsetX = (newWidth * this.squareSize) / 2
//     const offsetY = (newHeight * this.squareSize) / 2

//     inventoryItem.item.sprite?.setPosition(
//       oldCol * this.squareSize + offsetX,
//       oldRow * this.squareSize + offsetY
//     )
//   }

//   removeItemFromGrid(inventoryItem: InventoryItem) {
//     this.clearGridOccupied(inventoryItem.row, inventoryItem.col, inventoryItem.item.width, inventoryItem.item.height)
//   }

//   isGridOccupied(startRow: number, startCol: number, width: number, height: number): boolean {
//     for (let i = 0; i < height; i++) {
//       for (let j = 0; j < width; j++) {
//         const newRow = startRow + i
//         const newCol = startCol + j
//         if (!this.isValidGridPosition(newRow, newCol) || this.inventoryGrid[newRow][newCol].item.name !== '') {
//           return true
//         }
//       }
//     }
//     return false
//   }

//   async checkItemInInventory(itemName: string, amount: number) {
//     for (let row = 0; row < this.inventoryGrid.length; row++) {
//       for (let col = 0; col < this.inventoryGrid[0].length; col++) {
//         const inventoryItem = this.inventoryGrid[row][col]

//         if (inventoryItem.item.name === itemName && inventoryItem.amount < inventoryItem.item.maxStack) {
//           const remaining = inventoryItem.amount + amount - inventoryItem.item.maxStack
//           if (remaining > 0) {
//             inventoryItem.amount = inventoryItem.item.maxStack
//             inventoryItem.item.text?.setText('x' + inventoryItem.amount)
//             this.checkItemInInventory(inventoryItem.item.name, remaining)
//           } else {
//             inventoryItem.amount += amount
//             inventoryItem.item.text?.setText('x' + inventoryItem.amount.toString())
//           }

//           return
//         }
//       }
//     }

//     const newItem = this.itemsManager.getItem(itemName)
//     if (amount <= 0 || newItem == undefined) return

//     if (newItem.maxStack > amount)
//       await this.addItemToInventory(newItem, amount)
//     else {
//       await this.addItemToInventory(newItem, newItem.maxStack)
//       if (amount - newItem.maxStack > 0)
//         this.checkItemInInventory(newItem.name, amount - newItem.maxStack)
//     }
//   }

//   isValidGridPosition(row: number, col: number): boolean {
//     return row >= 0 && row < this.inventoryGrid.length && col >= 0 && col < this.inventoryGrid[0].length
//   }

//   initActions(inventoryItem: InventoryItem) {
//     if (inventoryItem.item.sprite) {
//       inventoryItem.item.sprite.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
//         if (pointer.rightButtonDown()) {
//           this.contextMenu?.showMenu({ x: pointer.x, y: pointer.y }, inventoryItem)
//           pointer.event.preventDefault()
//         }
//       })

//       inventoryItem.item.sprite.on('dragstart', (pointer: Phaser.Input.Pointer) => {
//         inventoryItem.item.sprite?.setDepth(99)
//         inventoryItem.item.sprite?.setTint(this.TINT_COLOR)
//         inventoryItem.isDragging = true
//         this.isDraggingItem = true
//         this.clearGridOccupied(inventoryItem.row, inventoryItem.col, inventoryItem.item.width, inventoryItem.item.height)
//       })

//       inventoryItem.item.sprite.on('drag', (pointer: Phaser.Input.Pointer, dragX: number, dragY: number) => {
//         const offsetX = (inventoryItem.item.width * this.squareSize) / 2
//         const offsetY = (inventoryItem.item.height * this.squareSize) / 2
//         inventoryItem.item.text?.setPosition(dragX + offsetX - 30, dragY + offsetY - 30)
//         inventoryItem.item.sprite?.setPosition(dragX, dragY)
//       })

//       inventoryItem.item.sprite.on('dragend', (pointer: Phaser.Input.Pointer, dropped: boolean) => {
//         if (dropped) {
//           inventoryItem.item.sprite?.clearTint()
//           this.isDraggingItem = false
//           inventoryItem.isDragging = false
//           inventoryItem.item.sprite?.setDepth(0)
//           const isSmallItem = inventoryItem.item.width === 1 && inventoryItem.item.height === 1
//           let newCol = Math.floor(pointer.x / this.squareSize) - Math.floor(this.x / this.squareSize)
//           let newRow = Math.floor(pointer.y / this.squareSize) - Math.floor(this.y / this.squareSize)
//           if (!isSmallItem) {
//             newCol -= Math.floor((inventoryItem.item.width - 1) / 2)
//             newRow -= Math.floor((inventoryItem.item.height - 1) / 2)
//           }
//           const validGridPosition = this.isValidGridPosition(newRow, newCol)
//           const isGridOccupied = this.isGridOccupied(newRow, newCol, inventoryItem.item.width, inventoryItem.item.height)
//           if (validGridPosition && !isGridOccupied) {
//             this.moveItem(inventoryItem, newRow, newCol)
//           } else {
//             this.moveItem(inventoryItem, inventoryItem.row, inventoryItem.col)
//           }
//         }
//       })
//     }
//   }

//   markGridOccupied(row: number, col: number, width: number, height: number) {
//     const inventoryItem = this.inventoryGrid[row][col];
//     for (let i = 0; i < height; i++) {
//       for (let j = 0; j < width; j++) {
//         this.inventoryGrid[row + i][col + j] = inventoryItem;
//       }
//     }
//   }

//   clearGridOccupied(row: number, col: number, width: number, height: number) {
//     for (let i = 0; i < height; i++) {
//       for (let j = 0; j < width; j++) {
//         this.inventoryGrid[row + i][col + j] = new InventoryItem(
//           new Item('', null, '', 1, 1, 0, null),
//           row,
//           col,
//           false,
//           0
//         );
//       }
//     }
//   }

//   createOffsets(height: number, width: number) {
//     return {
//       offsetX: (width * this.squareSize) / 2,
//       offsetY: (height * this.squareSize) / 2
//     } 
//   }
// }
