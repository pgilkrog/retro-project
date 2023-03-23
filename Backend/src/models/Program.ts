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
  }
})

const Program = mongoose.model('Program', programSchema)

export { Program }