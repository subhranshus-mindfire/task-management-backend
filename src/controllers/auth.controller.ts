import type { Request, Response, NextFunction } from 'express';
import * as authService from '../services/auth.service';
import { setAuthCookies } from '../utils/cookie';

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const { user, accessToken, refreshToken } = await authService.registerUser(name, email, password, role);

    setAuthCookies(res, accessToken, refreshToken);

    res.status(201).json({ message: 'User registered & logged in.', userId: user._id });
  } catch (err) {
    next(err);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    const { user, accessToken, refreshToken } = await authService.loginUser(email, password);

    setAuthCookies(res, accessToken, refreshToken);

    res.status(200).json({ message: 'Login successful.', userId: user._id });
  } catch (err) {
    next(err);
  }
};

export const logout = (req: Request, res: Response) => {
  res.clearCookie('accessToken');
  res.clearCookie('refreshToken');
  res.status(200).json({ message: 'Logged out successfully.' });
};

