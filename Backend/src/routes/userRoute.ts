import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import { User, UserSettings }  from '../models/index'
import auth from '../middleware/auth'

const router = express.Router()
const jsonParser = bodyParser.json()

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
  const userUpdate = req.body
  try {
    const updateUser = await User.findByIdAndUpdate(id, userUpdate, { new: true})

    if (!updateUser)
      return res.status(404).send({ error: 'Program not found'})

    res.send(updateUser)
  } catch (error: any) {
    console.log(error.message)
    res.status(500).send('server error')
  }
})

// @route       PUT api/user/:id
// @desc        Update userSettings by id
router.put('/settings/:id', auth, jsonParser, async (req: Request, res: Response) => {
  const id = req.params.id
  const userSettingsUpdate = req.body
  try {
    const updateUser = await UserSettings.findByIdAndUpdate(id, userSettingsUpdate, { new: true})

    if (!updateUser)
      return res.status(404).send({ error: 'Program not found'})

    res.send(updateUser)
  } catch (error: any) {
    console.log(error.message)
    res.status(500).send('server error')
  }
})

export = router