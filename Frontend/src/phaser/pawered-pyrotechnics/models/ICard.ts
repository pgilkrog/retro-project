export enum CardTypes {
  ADD_BOMB = 'bomb',
  LONGER_EXPLOSION = 'longer_explosion'
}

export interface ICard {
  type: CardTypes
  name: string
  image: string
}