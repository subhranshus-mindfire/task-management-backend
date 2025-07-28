import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || '12345678';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || '123456';

export const signAccessToken = (payload: object) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '15m' });
};

export const signRefreshToken = (payload: object) => {
  return jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: '7d' });
};

export const verifyAccessToken = (token: string) => {
  return jwt.verify(token, JWT_SECRET);
};

export const verifyRefreshToken = (token: string) => {
  return jwt.verify(token, JWT_REFRESH_SECRET);
};
