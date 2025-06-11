import express, { Express } from "express";
import { register } from "./users/register/register";
import { login } from "./users/login/login";
import { verifyToken } from "./middleware/verifyToken";
import { CustomRequest } from "./models/CustomRequest";
export const router : express.Router = express.Router();

router.post("/register", register);
router.post("/login", login);

router.get("/notes", verifyToken);
router.post("/notes", verifyToken);
router.put("/notes", verifyToken);
router.delete("/notes", verifyToken);