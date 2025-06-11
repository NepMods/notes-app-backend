import express from "express"
import { JwtPayload } from "jsonwebtoken";

export interface CustomRequest extends express.Request {
    user?: string | JwtPayload | undefined;
  }