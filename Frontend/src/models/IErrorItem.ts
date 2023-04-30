export class IErrorItem {
  text: string
  show: boolean
  icon: string
  timeStamp = new Date()

  constructor(text: string, show: boolean, icon: string) {
    this.text = text
    this.show = show
    this.icon = icon
  }
}
  