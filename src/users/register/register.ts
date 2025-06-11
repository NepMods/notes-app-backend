import express from "express"


export async function registerUser(req: express.Request, res: express.Response) {
    res.json({
        "message": "working"
    })
}
