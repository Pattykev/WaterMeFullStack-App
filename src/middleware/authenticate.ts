import { NextFunction, request, Request, Response } from "express";
import  Jwt from "jsonwebtoken";
import { User } from "../models/user";

declare module "jsonwebtoken" {
    export interface JwtPayLoad extends Request{

        user?: User;
    }
}
const verifyToken= (req: Request, res: Response, next: NextFunction)=>{
    const token=String(req.headers["x-access-token"]);

    if(!token){
        return res.status(401).json({
            errors: ["A token was not passed"]
        });
    }
    
    try{
        const decode=<Jwt.JwtPayLoad>(Jwt.verify(String(token), String(process.env.TOKEN_SECRET)));
        req.body.user =decode.user;
    }
    catch(error){
        return res.status(401).json({
            errors: ["invalid token"]

    });


}
return next();
};

export default verifyToken;