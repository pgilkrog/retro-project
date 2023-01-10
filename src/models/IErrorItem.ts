export class IErrorItem {
  title: string
  show: boolean
  icon: string

  constructor(title: string, show: boolean, icon: string) {
    this.title = title
    this.show = show
    this.icon = icon
  }
}
  