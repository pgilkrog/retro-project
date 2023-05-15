import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import auth from '../middleware/auth'

import { Program } from '../models/index'

const router = express.Router()
const jsonParser = bodyParser.json()

// @route       GET api/program
// @desc        Get all programs
router.get('/', auth, async (req: Request, res: Response) => {
  try {
    const fetchedItems = await Program.find()
    res.json({ programs: fetchedItems })
  } catch (error: any) {
    console.log(error.message)
    res.status(500).send('server error')
  }
})

// @route       DELETE api/program
// @desc        Delete program by id
router.delete('/:id', auth, async (req: Request, res: Response) => {
  try {
    const deletedItem = await Program.findByIdAndDelete({ _id: req.params.id})
    res.send({ item: deletedItem })
  } catch (error: any) {
    console.log(error.message)
    res.status(500).send('server error')
  }
})

// @route       POST api/program
// @desc        Create a program
router.post('/', auth, jsonParser, async (req: Request, res: Response) => {
  const { name, image, color, displayName, sortOrder, type } = req.query

  try {
    const newProgram = new Program({
      name,
      displayName,
      image,
      color,
      sortOrder,
      type
    })

    await newProgram.save()
    res.json(newProgram)
  } catch (error: any) {
    console.log(error.message)
    res.status(500).send('server error')
  }
})

// @route       PUT api/program/:id
// @desc        Update program by id
router.put('/:id', auth, async (req: Request, res: Response) => {
  console.log("UPDATE USER")
  const id = req.params.id
  const programToUpdate = req.query
  console.log("body", programToUpdate)
  try {
    const updateProgram = await Program.findByIdAndUpdate(id, programToUpdate, { new: true})

    if (!updateProgram)
      return res.status(404).send({ error: 'Program not found'})

    res.send(updateProgram)
  } catch (error: any) {
    console.log(error.message)
    res.status(500).send('server error')
  }
})

export = router