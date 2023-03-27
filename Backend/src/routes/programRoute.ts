import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'

import { Program } from '../models/index'

const router = express.Router()
const jsonParser = bodyParser.json()

router.get('/', async (req: Request, res: Response) => {
  debugger
  try {
    const fetchedItems = await Program.find({})
    res.json({ programs: fetchedItems })
  } catch (error: any) {
    console.log(error.message)
    res.status(500).send('server error')
  }
})

router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const deletedItem = await Program.findByIdAndDelete({ _id: req.params.id})
    res.send({ item: deletedItem })
  } catch (error: any) {
    console.log(error.message)
    res.status(500).send('server error')
  }
})

router.post('/', jsonParser, async (req: Request, res: Response) => {
  const { name, image, color, displayName, sortOrder } = req.body

  try {
    const newProgram = new Program({
      name,
      displayName,
      image,
      color,
      sortOrder
    })

    await newProgram.save()
    res.json(newProgram)
  } catch (error: any) {
    console.log(error.message)
    res.status(500).send('server error')
  }
})

router.put('/:id', async (req: Request, res: Response) => {
  const id = req.params.id
  const programToUpdate = req.body
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