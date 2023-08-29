import bodyParser from 'body-parser'
import express, { Request, Response } from 'express'
import { Painting } from '../models'
import auth from '../middleware/auth'

const router = express.Router()
const jsonParser = bodyParser.json()

router.get('/', jsonParser, async (req: Request, res: Response) => {
  try {
    const fetchedPaintings = await Painting.find()
    res.json({ paintings: fetchedPaintings})
  } catch (error) {
    console.log(error)
    res.status(500).send('error gettings all paintings')
  }
})

router.get('/:id', auth, async (req: Request, res: Response) => {
  console.log(req.params)
  try {
    const fetchedPaintings = await Painting.find({ uId: req.params.id }).exec()
    res.json({ paintings: fetchedPaintings })
  } catch (error) {
    console.log(error)
    res.status(500).send('error getting paintings with userId')
  }
})

router.post('/', jsonParser, async (req: Request, res: Response) => {
  try {
    const { name, canvas, uId } = req.body
    const newPainting = new Painting({
      name,
      canvas,
      uId,
    });
    await newPainting.save()
    res.json(newPainting)
  } catch (error) {
    console.log(error)
    res.status(500).send('server error')
  }
})

export = router