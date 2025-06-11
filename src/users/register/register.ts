import express from "express"
import {hash} from "bcrypt"
import { getMongoClient } from "../../components/mongodb";
import { checkUser, registerUser } from "../../libs/users";
import { BasicResponse } from "../../models/response";
import { UserWithoutToken } from "../../models/user";

export async function register(req: express.Request, res: express.Response<BasicResponse>) {
    const { email, password } = req.body;
    
    const username: string = email.split("@")[0];
    const userExists = await checkUser(username);
    
    if (userExists) {
        res.json({
            status: 500, 
            error: true,
            message: "User Already Exists",
            data: []
        })
        return;
    }
    
    const hashedPassword = await hash(password, 10);
    const user: UserWithoutToken = {
        email: email, 
        password: hashedPassword, 
        username: username
    }

    const result = await registerUser(user); 

    if (result) {
        res.json({
            status: 200, 
            error: false,
            message: "User Successfully registered",
            data: []
        })
        return;    
    }
    res.json({
        status: 500,
        error: true,
        message: "Internal Server Error",
        data: []
    });

}
