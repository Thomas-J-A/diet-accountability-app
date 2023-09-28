import jwt from 'jsonwebtoken';
import env from '../configs/env';

const generateToken = (userId: string) =>
  jwt.sign({ sub: userId }, env.ACCESS_TOKEN_SECRET, { expiresIn: 60 * 60 });

export default generateToken;
