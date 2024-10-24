export interface ISlide {
  id: number
  title: string
  text?: string
  image?: string
  type: SlideTypes
}

export enum SlideTypes {
  SlideTitleText = 'SlideTitleText',
  SlideTitleImage = 'SlideTitleImage',
}
