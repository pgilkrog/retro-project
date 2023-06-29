import mongoose from 'mongoose'

const userSettingsSchema = new mongoose.Schema({
  backgroundColour: {
    type: String,
    required: false,
    default: "#435452" 
  },
  backgroundImage: {
    type: String,
    required: false,
    default: ""
  },
  useBackground: {
    type: Boolean,
    required: false,
    default: false
  },
  theme: {
    type: String,
    required: false,
    default: 'standard'
  },
  displayOption: {
    type: String,
    required: false,
    default: 'stretch'
  }
})

const UserSettings = mongoose.model('UserSettings', userSettingsSchema)

export { UserSettings }