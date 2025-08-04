import type { Request } from "express";

export interface AuthRequest extends Request {
  user?: {
    userId: string;
    name: string;
    role: string;
    email: string
  };
}