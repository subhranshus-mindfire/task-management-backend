import { User } from '../models/User.js';
import { hashPassword, comparePasswords } from '../utils/hash.js';
import { signAccessToken, signRefreshToken } from '../utils/jwt.js';

export const registerUser = async (name: string, email: string, password: string, role: string) => {
  const existing = await User.findOne({ email });
  if (existing) {
    throw new Error('User already exists.');
  }

  const passwordHash = await hashPassword(password);

  const newUser = new User({ name, email, passwordHash, role });
  await newUser.save();

  const payload = { userId: newUser._id, role: newUser.role, name: newUser.name, email: newUser.email };

  const accessToken = signAccessToken(payload);
  const refreshToken = signRefreshToken(payload);

  return { user: newUser, accessToken, refreshToken };
};

export const loginUser = async (email: string, password: string) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('Invalid Email.');
  }

  const isMatch = await comparePasswords(password, user.passwordHash);
  if (!isMatch) {
    throw new Error('Invalid Password.');
  }

  const payload = { userId: user._id, role: user.role, name: user.name, email: user.email };
  const accessToken = signAccessToken(payload);
  const refreshToken = signRefreshToken(payload);

  return { user, accessToken, refreshToken };
};
