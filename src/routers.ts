import express, { Express } from "express";
import { register } from "./users/register/register";
import { login } from "./users/login/login";
export const router : express.Router = express.Router();

router.post("/register", register);
router.post("/login", login);