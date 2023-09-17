import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import { User, UserSettings }  from '../models/index'
import auth from '../middleware/auth'

const router = express.Router()
const jsonParser = bodyParser.json()

// @route       GET api/user
// @desc        GET all users
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const id = req.params.id

    const userFound = await User.findById({ _id: id }).populate('settings')
    
    res.send({ user: userFound })    
  } catch(error: any) {
    console.log(error.message)
    res.status(500).send('server error')
  }
})

// @route       PUT api/user/:id
// @desc        Update user by id
router.put('/:id', auth, jsonParser, async (req: Request, res: Response) => {
  const id = req.params.id
  const userUpdate = req.query

  try {
    const updatedUser = await User.findByIdAndUpdate(id, userUpdate, { new: true}).populate('settings')
    if (!updatedUser)
      return res.status(404).send({ error: 'User not found'})

    res.send(updatedUser)
  } catch (error: any) {
    console.log(error.message)
    res.status(500).send('server error')
  }
})

// @route       PUT api/user/settings/:id
// @desc        Update userSettings by id
router.put('/settings/:id', auth, async (req: Request, res: Response) => {
  const id = req.params.id
  const userSettingsUpdate = req.query
  console.log("UPDATE USERSETTINGS", id, userSettingsUpdate)
  try {
    const updateUserSetting = await UserSettings.findByIdAndUpdate(id, userSettingsUpdate, { new: true})

    if (!updateUserSetting)
      return res.status(404).send({ error: 'Program not found'})

    res.send(updateUserSetting)
  } catch (error: any) {
    console.log(error.message)
    res.status(500).send('server error')
  }
})

// @route       GET api/program
// @desc        Get all programs
router.get('/', auth, async (req: Request, res: Response) => {
  try {
    const fetchedItems = await User.find().populate('settings')
    res.json({ users: fetchedItems })
  } catch (error: any) {
    console.log(error.message)
    res.status(500).send('server error')
  }
})

export = router