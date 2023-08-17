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

router.get('/:id', auth, jsonParser, async (req: Request, res: Response) => {
try {
  const fetchedPaintings = Painting.findById({ uId: req.params.id })
  res.json({ paintings: fetchedPaintings })
} catch (error) {
  console.log(error)
  res.status(500).send('error getting paintings with userId')
}
})

router.post('/', auth, jsonParser, async (req: Request, res: Response) => {
  // const { name, canvas, uId } = req.body
  console.log(req.body, req.query)
  // try {
  //   const newPainting = new Painting({
  //     name,
  //     canvas,
  //     uId
  //   })
  //   console.log(newPainting)
  //   await newPainting.save()
  //   res.json(newPainting)
  // } catch (error) {
  //   console.log(error)
  //   res.status(500).send('server error')
  // }
})

export = router