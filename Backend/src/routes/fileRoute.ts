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

// @route       GET files
// @desc        Get all files
router.get('/', auth, jsonParser, async (req: Request, res: Response) => {
  try {
    const fetchedItems = await File.find()
    res.json({ files: fetchedItems })
  } catch (error: any) {
    console.log(error.message)
    res.status(500).send('server error')
  }
})

// @route       POST api/files/upload
// @desc        Uploads a file
router.post('/upload', auth, upload.single('image'), jsonParser, async (req: Request, res: Response) => {
  res.send({ file: req.file })
})

// @route       POST api/files/upload
// @desc        Uploads a file object to db
router.post('/', auth, jsonParser, async (req: Request, res: Response) => {
  const { name, originalName, size, type, url, userId } = req.query

  try {
    const newFile = new File({
      name,
      originalName,
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

// @route       DELETE api/files/:id
// @desc        Delete file by id
router.delete('/:id', auth, async (req: Request, res: Response) => {
  try {
    const deleteItem = await File.findByIdAndDelete({ _id: req.params.id })
    res.send({ item: deleteItem })    
  } catch(error: any) {
    console.log(error.message)
    res.status(500).send('server error')
  }
})

// @route       PUT api/files/:id
// @desc        Update file by id
router.put('/:id', auth, async (req: Request, res: Response) => {
  try {
    const id = req.params.id
    const fileToUpdate = req.query
    
    const updateFile = await File.findByIdAndUpdate(id, fileToUpdate, { new: true })

    if (!updateFile)
      return res.status(404).send({ error: 'File not found' })

    res.send(updateFile)    
  } catch(error: any) {
    console.log(error.message)
    res.status(500).send('server error')
  }
})

export = router