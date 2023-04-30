export class IMenuItem {
  title: string
  img: string
  subMenu: IMenuItem[]

  constructor(title: string, img: string, subMenu: IMenuItem[]) {
    this.title = title
    this.img = img
    this.subMenu = subMenu
  }
}
  