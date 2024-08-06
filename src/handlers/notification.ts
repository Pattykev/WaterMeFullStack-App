import express, { Request, Response } from "express";
import { Plants, PlantsQueries } from "../models/plant";
import {verifyToken} from "../middleware/authenticate";

const plantHandler = new PlantsQueries();



const notify = async (req: Request, res: Response) => {
  try{
  const notification = await plantHandler.notify(Number(req.params.id));
if(!notification){
  return res.status(404).send("no notification found");
}
  res.status(200).json(notification);
  }
  catch (err) {
    res.status(400);
    res.json( err);
  }
};



const notifyRoutes = (app: express.Application) => {
  
  app.get('/notify/:id', notify)
  
};
export default notifyRoutes;
