import dotenv from 'dotenv';
import crypto from 'crypto';

dotenv.config();

const generateSecret = () => {
  return crypto.randomBytes(64).toString('hex');
};

export const config = {
  jwt: {
    secret: process.env.JWT_SECRET || generateSecret(),
    expiresIn: '1h'
  },
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || 'development'
}; 