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

router.post('/', jsonParser, async (req: Request, res: Response, next: any) => {
  const { name, image, color } = req.body

  try {
    const newProgram = new Program({
      name,
      image,
      color
    })

    await newProgram.save()
    res.json(newProgram)
  } catch (error: any) {
    console.log(error.message)
    res.status(500).send('server error')
  }
})

export = router