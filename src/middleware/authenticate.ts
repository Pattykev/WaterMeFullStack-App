import { NextFunction, request, Request, Response } from "express";
import  Jwt, { JwtPayload } from "jsonwebtoken";
import { User } from "../models/user";


    export interface JwtPayLoad extends Request{

        user?: User;
    }

const verifyToken= async (req: JwtPayLoad , res: Response, next: NextFunction)=>{

    try{
        const token=Jwt.sign({
            exp: Math.floor(Date.now() / 1000) + (60 * 60),
            data: 'foobar'
          }, 'secret');
    //const token=req.headers.authorization?.split(" ")[1];

    if(!token){
        return res.status(401).json({
            errors: ["A token was not passed"]
        });
    }
    
   
      // const decode=<JwtPayLoad>(Jwt.verify(String(token), String(process.env.TOKEN_SECRET)));
        //req.user =decode.user;
        next();
    }
    catch(error){
        next(error);

    }


}





export default verifyToken;