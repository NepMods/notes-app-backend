import express from "express"
import { JwtPayload } from "jsonwebtoken";

/* 
 Model Definaltion for Request, to be used when request is 
 sent with token

*/

export interface CustomRequest extends express.Request {
    user?: string;
  }