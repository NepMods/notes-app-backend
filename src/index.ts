import { Express } from "express";
import { configDotenv } from "dotenv";
import { app } from "./app"

configDotenv()


const port: number = Number.parseInt(process.env.PORT ?? "3000");
app.listen(port, () => {
    console.log(`Backend Running on http://0.0.0.0:${port}`);
})