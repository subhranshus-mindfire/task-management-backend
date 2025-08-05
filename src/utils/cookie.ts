import type { Response } from "express";
export const setAuthCookies = (res: Response, accessToken: string, refreshToken: string) => {
  let isProd = false;
  if (process.env.DEPLOYED_FRONTEND_URL) {
    isProd = true;
  }
  res.cookie('accessToken', accessToken, {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? 'none' : 'lax',
    maxAge: 60 * 60 * 1000,
  });

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? 'none' : 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};
