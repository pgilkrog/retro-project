export class IUserSettings {
  id: string
  backgroundColour: string
  backgroundImage: string
  useBackground: boolean
  theme: string

  constructor(
    id: string, 
    backgroundColour: string, 
    backgroundImage: string, 
    useBackground: boolean, 
    theme: string
  ) {
    this.id = id
    this.backgroundColour = backgroundColour
    this.backgroundImage = backgroundImage
    this.useBackground = useBackground
    this.theme = theme
  }
}