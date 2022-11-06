export default {
  addCollider(otherGameobject: any, callback: any, scene: any) {
    scene.physics.add.collider(this, otherGameobject, callback, null, this)
  }
}