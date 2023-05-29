import mongoose from 'mongoose'

const errorSchema = new mongoose.Schema({
  text: {
    type: String, 
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  userId: {
    type: String,
    required: true
  }
})

const Error = mongoose.model('Error', errorSchema)

export { Error }