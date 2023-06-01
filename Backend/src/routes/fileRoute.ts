import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import auth from '../middleware/auth'
import multer from 'multer'

import { File } from '../models/index'

const router = express.Router()
const jsonParser = bodyParser.json()
// const upload = multer({ dest: 'uploads'})

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function(req, file, cb) {
    const originalname = Date.now() + '-' + file.originalname
    const filename = originalname.trim().replace(/\s+/g, "-")
    cb(null, filename)
  }
})

// File filter function to only allow images and PDFs
const fileFilter = function (req: Request, file: Express.Multer.File, cb: any) {
  if (file.mimetype.startsWith('image/') || file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only images and PDFs are allowed.'));
  }
};

// Set up Multer middleware
const upload = multer({ storage: storage, fileFilter: fileFilter });

// @desc upload image
// 
router.post('/upload', auth, upload.single('image'), jsonParser, async (req: Request, res: Response) => {
  res.send({ file: req.file })
})

router.post('/', auth, jsonParser, async (req: Request, res: Response) => {
  const { name, size, type, url, userId, createdAt } = req.query

  try {
    const newFile = new File({
      name,
      size, 
      type,
      url,
      userId
    })
    await newFile.save()
    res.json(newFile)
  } catch (error) {
    res.status(500).send('server error')
  }
})

export = router