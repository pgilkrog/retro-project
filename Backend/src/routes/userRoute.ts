import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import bcrypt from 'bcryptjs'
import { body, validationResult } from 'express-validator'
import jwt from 'jsonwebtoken'
import { User }  from '../models/User'
import auth from '../middleware/auth'

import * as config from "../config/default.json"

const router = express.Router()
const jsonParser = bodyParser.json()

module.exports = router