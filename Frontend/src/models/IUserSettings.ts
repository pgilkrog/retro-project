export class IUserSettings {
  id: string
  userId: string
  backgroundColour: string
  backgroundImage: string
  useBackgroundImage: boolean
  theme: string

  constructor(id: string, userId: string, backgroundColour: string, backgrondImage: string, useBackgroundImage: boolean, theme: string) {
    this.id = id
    this.userId = userId
    this.backgroundColour = backgroundColour
    this.backgroundImage = backgrondImage
    this.useBackgroundImage = useBackgroundImage
    this.theme = theme
  }
}