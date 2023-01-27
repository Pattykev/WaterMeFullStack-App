import express, { Request, Response } from "express";
import { User, UserQueries } from "../models/user";
import jwt from "jsonwebtoken";
import auth from "../middleware/authenticate";

const userHandler = new UserQueries();

const index = async ( _req: Request, res: Response) => {
  const users = await userHandler.index();
  res.json({users});
};

const verifyAuthToken = ( req: Request, res: Response, next: () => void) => {
  try {
    const authorizationHeader = String(req.headers.authorization);
    const token = String(authorizationHeader.split(' ')[1]);
    jwt.verify(token, String(process.env.TOKEN_SECRET));
    next();
  } catch (err) {
    res.status(401);
    res.json("Access denied, invalid token");
  }
};

const show = async (req: Request, res: Response) => {
  const user = await userHandler.show(Number(req.params.id));
  res.json({user});
};

const create = async (req: Request, res: Response) => {
  try {
    const user: User = {
      userName: req.body.userName,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: req.body.password
    };
    const newUser = await userHandler.create(user);
    const token = jwt.sign(
      { user:{ ...user, password: "_"}},
      String(process.env.TOKEN_SECRET)
    );
    
    return res.json(token);
  } catch (err) {
    res.status(400);
    res.json({err});
  }
};

const authenticate = async (req: Request, res: Response) => {
  try {
    const user = {
      userName: req.body.userName,
      password: req.body.password
    };
    const newUser = await userHandler.authenticate(
      user.userName,
      user.password
    );
    const token = jwt.sign(
      { user:{ ...user, password: "_"}},
      String(process.env.TOKEN_SECRET)
    );
    
    return res.json({token});
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
    const newUser = await userHandler.update(user);
    res.json({newUser});
  } catch (err) {
    res.status(400);
    res.json({err});
  }
};

const remove = async (req: Request, res: Response) => {
  const deleteUser = await userHandler.delete(req.body.id);
  res.json({deleteUser});
};

const userRoutes = (app: express.Application) => {
  app.get("/user", index),
    app.get("/user/:id", show),
    app.post("/user/authenticate",  authenticate),
    app.post("/user/create", create),
    app.put("/user/update",  update),
    app.delete("/user/remove",remove);
};
export default userRoutes;
