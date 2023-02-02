export class IPainting {
  Id: string
  Name: string
  Canvas: string
  UId: string

  constructor(id: string, name: string, Canvas: string, UId: string) {
    this.Id = id
    this.Name = name
    this.Canvas = Canvas
    this.UId = UId
  }
}