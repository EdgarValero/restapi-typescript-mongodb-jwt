import { Request, Response } from 'express';
import User, { IUser } from '../models/user.model';

import jwt from 'jsonwebtoken';
import config from '../config/config';

const createToken = (user: IUser) => {
  return jwt.sign({ id: user._id, email: user.email }, config.jwtSecretKey, {
    expiresIn: 86400 // Expire in One Day
  });
};

export const signUp = async (req: Request, res: Response): Promise<Response> => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ msg: 'Please. Your Email and Password' });
  }
  const user = await User.findOne({ email });
  if (user) {
    return res.status(400).json({ msg: 'User already exists' });
  }
  const newUser = new User({ email, password });
  await newUser.save();
  return res.status(201).json(newUser);
}

export const signIn = async (req: Request, res: Response): Promise<Response> => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ msg: 'Please. Your Email and Password' });
  }
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ msg: 'User does not exists' });
  }
  const isMatch = await user.comparePassword(password);
  if (isMatch) {
    return res.status(200).json({ token: createToken(user) })
  }
  return res.status(400).json({ msg: 'The email or password are incorrect' });
}