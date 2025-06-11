import express from "express"
import {hash} from "bcrypt"
import { getMongoClient } from "../../libs/mongodb";
import { checkUser, getUser, loginUser } from "../../libs/users";
import { BasicResponse } from "../../models/response";
import { UserWithoutToken } from "../../models/user";

export async function login(req: express.Request, res: express.Response<BasicResponse>) {
    const { email, password } = req.body;
    if (!email || !password) {
        res.json({
            status: 200,
            message: "Please send all parameter.",
            error: false,
            data: [],
        })
        return;
    }
    // Chck User
    const username: string = email.split("@")[0];
    const user: boolean = await checkUser(username);

    if (!user) {
        res.json({
            status: 500, 
            error: true,
            message: "User Doesnt Exists",
            data: []
        })
        return;    
    }

    // Login
    const result = await loginUser(email, password); 

    if (result) {
        res.json(result)
        return;    
    }
    res.json({
        status: 500,
        error: true,
        message: "Internal Server Error",
        data: []
    });

}
