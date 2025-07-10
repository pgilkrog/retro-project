import { CardTypes, type ICard } from "./models/ICard"

export default class CardController {
  private scene: Phaser.Scene | undefined 
  public cards:  Phaser.Physics.Arcade.Group | undefined

  private cardsList: Record<CardTypes, ICard> = {
    [CardTypes.ADD_BOMB]: { type: CardTypes.ADD_BOMB, name: '1 more bomb', image: 'cardBomb'},
    [CardTypes.LONGER_EXPLOSION]: { type: CardTypes.LONGER_EXPLOSION, name: 'More Explosion', image: 'cardExplosion'}
  }

  constructor(
    scene: Phaser.Scene, 
  ) {
    this.scene = scene
    
    this.cards = scene.physics.add.group({
      classType: Phaser.Physics.Arcade.Sprite,
      maxSize: 50,
      runChildUpdate: true,
    })  
  }

  // method for spawning a card from the cards array
  spawnCard = (x: number, y: number): Phaser.Physics.Arcade.Sprite | undefined => {
    if (this.cards == undefined) {
      return undefined
    }

    // get a random card from the cardlist
    const cardTypes = Object.keys(this.cardsList) as CardTypes[]
    const randomIndex = Math.floor(Math.random() * cardTypes.length)
    const cardType = cardTypes[randomIndex]
    const cardConfig = this.cardsList[cardType]

    const card = this.cards.get(x, y, cardConfig.image)
    
    if (card != undefined) {
      card.setActive(true)
        .setVisible(true)
        .setImmovable(true)
        .setScale(0.8)
        .setDepth(1)
      card.info = cardConfig
    }

    return card
  }
}