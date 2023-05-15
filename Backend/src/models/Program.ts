import mongoose from 'mongoose'

const programSchema = new mongoose.Schema ({
  name: {
    type: String,
    required: true
  },
  displayName: {
    type: String, 
    reguired: true
  },
  image: {
    type: String,
    required: true 
  },
  color: {
    type: String,
    required: false,
    default: 'dark'
  },
  sortOrder: {
    type: Number,
    required: true
  },
  type: {
    type: String,
    required: true
  }
})

const Program = mongoose.model('Program', programSchema)

export { Program }