import express from "express"
import {hash} from "bcrypt"
import { checkUser, registerUser } from "../../libs/users";
import { BasicResponse } from "../../models/response";
import { UserWithoutToken } from "../../models/user";
import { configDotenv } from "dotenv";
configDotenv();

export async function register(req: express.Request, res: express.Response<BasicResponse>) {
    const { email, password } = req.body;
    

    //Check Parameters
    if (!email || !password) {
        res.json({
            status: 200,
            message: "Please send all parameter.",
            error: false,
            data: [],
        })
        return;
    }
    // Chekc User
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
    
    // Hash the password
    const hashedPassword = await hash(password, 10);
    const user: UserWithoutToken = {
        email: email, 
        password: hashedPassword, 
        username: username
    }

    //Register
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
