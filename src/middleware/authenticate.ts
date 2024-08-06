import { NextFunction, request, Request, Response } from "express";
import  Jwt, { Secret } from "jsonwebtoken";
import { User } from "../models/user";
import dotenv from "dotenv";

dotenv.config();

const SECRET= process.env.TOKEN_SECRET as Secret;


    export const getTokenByUser=(user:User)=>{
        return Jwt.sign({user},SECRET);

    }
    export const  verifyToken=(req: Request , res: Response, next: NextFunction)=>{
        if(!req.headers.authorization){
            return res.status(401).json({
                errors: "Access denied invalid token"
            });
            return false;
        }
        try{
        const token=req.headers.authorization?.split(" ")[1];
        Jwt.verify(token,SECRET);
        next();
        }
        catch(error){
            res.status(401).json('Access denied, invalid token');
            return;
        }
    

    };

