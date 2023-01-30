import express, { Request, Response } from "express";
import { User, UserQueries } from "../models/user";
import {getTokenByUser, verifyToken} from "../middleware/authenticate";

const userHandler = new UserQueries();

const index = async ( _req: Request, res: Response) => {
  try{
  const users = await userHandler.index();
  if(users.length==0){
   return res.status(404).send("no users found");
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
    return res.status(404).send("no user found");
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
      return res.status(404).send("Missing value");
     }

    const newUser: User = await userHandler.create(user);
    res.json(getTokenByUser(newUser));
    
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
      return res.status(404).send("Cannot be connect");
    }
    
     res.status(200).json(getTokenByUser(newUser));
  } catch (err) {
    res.status(400);
    res.json({err});
  }
};

const update = async (req: Request, res: Response) => {
  try {
    const user: User = {
      id:req.params.id as unknown as number ,
      userName: req.body.userName,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: req.body.password
    };
    if(!user.userName || !user.firstName || !user.lastName || !user.password){
      return res.status(404).send("Missing value");
     }
    const newUser = await userHandler.update(user);
    
    
    return res.status(200).json( newUser);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const remove = async (req: Request, res: Response) => {
  try{
  await userHandler.delete(Number(req.params.id));
  res.send("user delete with success");
  }
  catch(error){
    res.status(400).json(error);
  }
};

const userRoutes = (app: express.Application) => {
  app.get("/user", index),
    app.get("/user/:id",  show),
    app.post("/user/authenticate",  authenticate),
    app.post("/user/create", create),
    app.put("/user/update/:id", verifyToken, update),
    app.delete("/user/remove/:id",verifyToken, remove);
};
export default userRoutes;
