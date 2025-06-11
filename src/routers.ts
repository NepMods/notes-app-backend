import express, { Express } from "express";
import { register } from "./users/register/register";
import { login } from "./users/login/login";
import { verifyToken } from "./middleware/verifyToken";
import { addNoteForUser, deleteNoteForUser, getNotesForUser, updateNoteForUser } from "./notes/notes";
export const router : express.Router = express.Router();

router.post("/register", register);
router.post("/login", login);

router.get("/notes", verifyToken, getNotesForUser);
router.post("/notes", verifyToken, addNoteForUser);
router.put("/notes/:id", verifyToken, updateNoteForUser);
router.delete("/notes/:id", verifyToken, deleteNoteForUser);