import mongoose from 'mongoose'

const fileSchema = new mongoose.Schema ({
  name: {
    type: String,
    required: true
  },
  originalName: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  type: {
    type: String, 
    required: true
  }, 
  userId: {
    type: String,
    required: true
  }, 
  size: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

const File = mongoose.model('File', fileSchema)

export { File }