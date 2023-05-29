import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import auth from '../middleware/auth'

const router = express.Router()
const jsonParser = bodyParser.json()

//
//
router.post('', auth, async (req: Request, res: Response) => {
  
})

export = router