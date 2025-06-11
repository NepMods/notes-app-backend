import express from "express";
import { configDotenv } from "dotenv";
import jwt, { JwtPayload } from "jsonwebtoken"
import { CustomRequest } from "../models/CustomRequest";
import { BasicResponse } from "../models/response";
configDotenv();


/* 
 Middleware for verifying token
*/
export function verifyToken(req: CustomRequest, res: express.Response<BasicResponse>, next: express.NextFunction): void {
    // Split the auth header
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1]; // Bearer <TOKEN>

    if (!token) {
        res.status(401).json({ status: 500, error: true, message: "No Token Provided", data: [] });
        return;
    }
    const SECRET = process.env.JWT_SECRET;
    if (!SECRET) {
        res.status(401).json({ status: 500, error: true, message: "Internal Server Error", data: [] });
        return;
    }

    // Verify the token and proceed accordingly
    jwt.verify(token, SECRET, (err, decoded) => {
        if (err || typeof decoded !== "object" || !("email" in decoded)) {
          res.status(403).json({
            status: 403,
            error: true,
            message: "Token Invalid or Expired",
            data: [],
          });
          return;
        }
    
        req.user = (decoded as JwtPayload).email;
        next();
      });
}

