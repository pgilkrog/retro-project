import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: false
  },
  lastname: {
    type: String,
    required: false
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: 'user'
  },
  settings: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserSettings'
  }
})

const User = mongoose.model('User', userSchema)

export { User }