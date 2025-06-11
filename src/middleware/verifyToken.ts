import express from "express";
import { configDotenv } from "dotenv";
import jwt from "jsonwebtoken"
import { CustomRequest } from "../models/CustomRequest";
configDotenv();

export function verifyToken(req: CustomRequest, res: express.Response, next: express.NextFunction): void {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1]; // Bearer <TOKEN>

    if (!token) {
        res.status(401).json({ error: "No token provided" });
        return;
    }
    const SECRET = process.env.JWT_SECRET;
    if (!SECRET) {
        res.status(500).json({ error: "JWT_SECRET not set" });
        return;
    }

    jwt.verify(token, SECRET, (err, decoded) => {
        if (err) return res.status(403).json({ error: "Invalid or expired token" });
        req.user = decoded;
        next();
    });
}

