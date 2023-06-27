export class IUserSettings {
  _id: string
  backgroundColour: string
  backgroundImage: string
  useBackground: boolean
  displayOption: string
  theme: string

  constructor(
    _id: string, 
    backgroundColour: string, 
    backgroundImage: string, 
    useBackground: boolean, 
    displayOption: string,
    theme: string
  ) {
    this._id = _id
    this.backgroundColour = backgroundColour
    this.backgroundImage = backgroundImage
    this.useBackground = useBackground
    this.displayOption = displayOption
    this.theme = theme
  }
}