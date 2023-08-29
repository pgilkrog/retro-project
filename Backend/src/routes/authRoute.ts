import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import bcrypt from 'bcryptjs'
import { body, validationResult } from 'express-validator'
import jwt from 'jsonwebtoken'
import { User, UserSettings }  from '../models/index'
import auth from '../middleware/auth'
import * as config from "../config/default.json"

const router = express.Router()
const jsonParser = bodyParser.json()

// Constants
const TOKEN_EXPIRES = 3600

// @route       GET api/auth
// @desc        Get logged in user
router.post('/refreshToken/', jsonParser, async (req: Request, res: Response) => {

  try {
    const { id } = req.body
    const user = await User.findById(id).select('-password')
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials!'})
    }

    const payload = {
      user: {
        _id: user._id
      }
    }

    // Make a json web token
    jwt.sign(payload, config.jwtSecret, {
      expiresIn: TOKEN_EXPIRES
    }, (err, token) => {
      if (err) {
        return res.status(500).send(err.message)
      }
      res.json({ token, user })
    });            
  } catch(err) {
    res.status(500).send('Server error')
  }
})

// @route       GET api/auth
// @desc        Log user in
router.post('/login/', jsonParser, [
  body('email', 'Please include a valid email').isEmail(),
  body('password', 'Password is required').exists()
], async (req: Request, res: Response) => {
  const errors = validationResult(req)
  
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const { email, password } = req.body

  try {
    // Find a user with email
    const user = await User.findOne({ email }) as any
    
    if (!user) {
      return res.status(400).json({ msg: 'Invalid Email!'})
    }

    // Check if passwords match eachother
    const isMatch = await bcrypt.compare(password, user.password)
  
    if(!isMatch) {
      return res.status(400).json({ msg: 'Invalid Password!'})
    }
    
    const payload = {
      user: {
        _id: user._id
      }
    }

    // Make a json web token
    jwt.sign(payload, config.jwtSecret, {
      expiresIn: TOKEN_EXPIRES
    }, (err, token) => {
      if (err) {
        return res.status(500).send(err.message)
      }
      res.json({ token, user })
    })

  } catch(err) {
    res.status(500).send('server error')
  }
})

// @route       GET api/auth
// @desc        Regiser user
router.post('/', jsonParser, [
  body('email').isEmail(),
  body('password').isLength({ min: 6 })
], async (req: Request, res: Response) => {
  
  const errors = validationResult(req.body)

  if (!errors.isEmpty())
    return res.status(400).json({ erros: errors.array() })

  const { firstName, lastName, email, password } = req.body

  try {
    let fetchedUser = await User.findOne({ email })

    if (fetchedUser) {
      return res.status(400).json({ msg: 'Email already exists' })
    }

    // Generate a hashed password
    const salt = await bcrypt.genSalt(10)

    let userSettings = new UserSettings({
      backgroundColour: '#435452',
      backgroundImage: '',
      useBackground: false,
      theme: 'standard'
    });

    let user = new User({
      firstName,
      lastName,
      email,
      password: await bcrypt.hash(password, salt),
      installedPrograms: ['645be25c282005257c879cbc'],
      settings: userSettings._id
    })

    console.log("CREATED USERSETTINGS", userSettings)
    console.log("CREATED USER", user)

    await userSettings.save()
    await user.save()

    const payload = {
      user: {
        _id: user._id
      }
    }

    const id = user._id
    const role = user.type

    jwt.sign(payload, config.jwtSecret, {
      expiresIn: TOKEN_EXPIRES
    }, (err, token) => {
      if (err) {
        return res.status(500).send(err.message)
      }
      res.json({ token, id, role })
    })
  } catch (error) {
    res.status(500).send(error)
  }
  
})

export = router