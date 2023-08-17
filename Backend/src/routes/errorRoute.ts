import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import { Error } from '../models/index'

const router = express.Router()
const jsonParser = bodyParser.json()

// @route      GET
// @desc       Get all erros
router.get('/', jsonParser, async (req: Request, res: Response) => {
  try {
    const fetchedErros = await Error.find()
    res.json({ errors: fetchedErros })
  } catch (error: any) {
    res.status(500).send('server error')
  }
})

// @route     CREATE
// @desc      Create error
router.post('/', jsonParser, async (req: Request, res: Response) => {
  const { text, date, userId } = req.query

  try {
    const newError = new Error({
      text,
      date,
      userId
    })
    await newError.save()
    res.json(newError)
  } catch(error: any) {
    console.log(error)
    res.status(500).send('server error')
  }
})

export = router