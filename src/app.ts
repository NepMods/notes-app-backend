import express, { Express } from "express";
import {router as userRouter} from "./routers"

export const app: Express = express();
app.use(express.json());

app.use("/", userRouter);
