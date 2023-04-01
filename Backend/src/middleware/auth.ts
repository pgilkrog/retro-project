import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import * as config from '../config/default.json';

export = (req: Request, res: Response, next: NextFunction) => {
    // Get token from the header
    const token = req.header('Authorization');

    // Check if no token
    if (!token) {
        return res.status(401).json({ msg: 'No Token, authorization denied!'});
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, config.jwtSecret);
        // Get the user
        req.body = decoded;
        next();
    } catch {
        res.status(401).json({ msg: 'Token is not valid!'});
    }
}