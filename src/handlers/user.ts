import express, { Request, Response } from "express";
import { User, UserQueries } from "../models/user";
import jwt from "jsonwebtoken";
import auth from "../middleware/authenticate";

const userHandler = new UserQueries();

const index = async ( _req: Request, res: Response) => {
  try{
  const users = await userHandler.index();
  if(users.length==0){
   return res.status(404).json(users);
  }
  res.status(200).json(users);
}
catch(error){
  res.status(400).json(error);
}
};


const show = async (req: Request, res: Response) => {
  try{

  const user = await userHandler.show(Number(req.params.id));
  if(!user){
    return res.status(404).json(user);
   }
  res.status(200).json(user);
}
catch(error){
  res.status(400).json(error);
}
};

const create = async (req: Request, res: Response) => {
  try {
    const user: User = {
      userName: req.body.userName,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: req.body.password
    };
    if(!user.userName || !user.firstName || !user.lastName || !user.password){
      return res.status(404).json("Missing value");
     }

    const newUser: User = await userHandler.create(user);
    const token = jwt.sign( user,String(process.env.TOKEN_SECRET));
    
    return res.status(200).json({token, newUser});
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const authenticate = async (req: Request, res: Response) => {
  try {
    const user = {
      userName: req.body.userName,
      password: req.body.password
    };
    const newUser: User | null = await userHandler.authenticate(
      user.userName,
      user.password
    );
    if(!newUser){
      return res.status(404).json("Cannot be connect");
    }
    const token = jwt.sign( user,String(process.env.TOKEN_SECRET));
    
     res.status(200).json(token);
  } catch (err) {
    res.status(400);
    res.json({err});
  }
};

const update = async (req: Request, res: Response) => {
  try {
    const user: User = {
      id: req.body.id,
      userName: req.body.userName,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: req.body.password
    };
    if(!user.userName || !user.firstName || !user.lastName || !user.password){
      return res.status(404).json("Missing value");
     }
    const newUser = await userHandler.update(user);
    const token = jwt.sign( user,String(process.env.TOKEN_SECRET));
    
    return res.status(200).json({token, newUser});
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const remove = async (req: Request, res: Response) => {
  const deleteUser = await userHandler.delete(req.body.id);
  res.json({deleteUser});
};

const userRoutes = (app: express.Application) => {
  app.get("/user",auth, index),
    app.get("/user/:id", auth, show),
    app.post("/user/authenticate",auth,  authenticate),
    app.post("/user/create",auth, create),
    app.put("/user/update", auth, update),
    app.delete("/user/remove",auth, remove);
};
export default userRoutes;
