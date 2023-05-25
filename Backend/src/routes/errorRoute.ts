import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'

import { Error } from '../models/index'

const router = express.Router()
const jsonParser = bodyParser.json()

// @route     CREATE
// @desc      Create error
router.post('/', jsonParser, async (req: Request, res: Response) => {
  const { text } = req.query

  const date = Date.now()

  try {
    const newError = new Error({
      text,
      date
    })

    await newError.save()
    res.json(newError)
  } catch(error: any) {
    console.log(error)
    res.status(500).send('server error')
  }
})

export = router