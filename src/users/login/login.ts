import express from "express"
import {hash} from "bcrypt"
import { getMongoClient } from "../../components/mongodb";
import { checkUser, getUser, loginUser } from "../../libs/users";
import { BasicResponse } from "../../models/response";
import { UserWithoutToken } from "../../models/user";

export async function login(req: express.Request, res: express.Response<BasicResponse>) {
    const { email, password } = req.body;
    
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
