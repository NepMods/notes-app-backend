import express, { Express } from "express";
import { registerUser } from "./users/register/register";
export const router : express.Router = express.Router();

router.post("/register", registerUser);