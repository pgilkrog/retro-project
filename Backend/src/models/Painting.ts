import mongoose from 'mongoose'

const PaintingSchema = new mongoose.Schema({
  name: {
    type: String, 
    required: true
  },
  canvas: {
    type: String, 
    required: true
  },
  uId: {
    type: String, 
    required: true
  }
})

const Painting = mongoose.model('Painting', PaintingSchema)

export { Painting }