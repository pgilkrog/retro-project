export class IUserSettings {
  id: string
  backgroundColour: string
  backgroundImage: string
  useBackgroundImage: boolean
  theme: string

  constructor(
    id: string, 
    backgroundColour: string, 
    backgroundImage: string, 
    useBackgroundImage: boolean, 
    theme: string
  ) {
    this.id = id
    this.backgroundColour = backgroundColour
    this.backgroundImage = backgroundImage
    this.useBackgroundImage = useBackgroundImage
    this.theme = theme
  }
}