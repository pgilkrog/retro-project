import mongoose from 'mongoose'

const errorSchema = new mongoose.Schema({
  text: {
    type: String, 
    required: true
  },
  timeStamp: {
    type: Date,
    required: true
  } 
})

const Error = mongoose.model('Error', errorSchema)

export { Error }