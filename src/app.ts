import express, { Express } from "express";
import {router as userRouter} from "./routers"

export const app: Express = express();
app.use(express.json());

// Define Routes. maybe use /api for better readability
app.use("/", userRouter);
