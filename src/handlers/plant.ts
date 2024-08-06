import express, { Request, Response } from "express";
import { Plants, PlantsQueries, Watering } from "../models/plant";
import {verifyToken} from "../middleware/authenticate";

const plantHandler = new PlantsQueries();


const index = async (_req: Request, res: Response) => {
  try{
  const plants = await plantHandler.index();
if(plants.length==0){
  return res.status(404).send("no plants found");
}
  res.status(200).json(plants);
  }
  catch (err) {
    res.status(400);
    res.json( err);
  }
};

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



const show = async (req: Request, res: Response) => {
 try  {
  const plant = await plantHandler.show(Number(req.params.id));
  if(!plant){
    return res.status(404).send("no plant found");
  }
    res.status(200).json(plant);
}
  catch (err) {
    res.status(400);
    res.json(err);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const plant: Plants = {
      name: req.body.name,
      species: req.body.species,
      quantity: req.body.quantity,
      frequency: req.body.frequency,
      id_user: req.body.id_user
    };
    if(!plant.name || !plant.species || !plant.quantity || !plant.frequency || !plant.id_user){
      return res.status(404).send("missing value");
    }
     
    const newPlant = await plantHandler.create(plant);
    res.status(200).json({newPlant});
  } catch (err) {
    res.status(400);
    res.json({err});
  }
};


const update = async (req: Request, res: Response) => {
  try {
    const watering: Watering = {
      id: req.body.id,
      watered: req.body.watered
    };
    if( !watering.id){
      return res.status(404).send("missing value");
    }
    const newPlant = await plantHandler.update(watering);
    res.status(200).json({newPlant});
  } catch (err) {
    res.status(400);
    res.json({err});
  }
};

/*
const remove = async (req: Request, res: Response) => {
  try{
  const deleteProduct = await productHandler.delete(Number(req.params.id));
  res.status(200).json(deleteProduct);
}
  catch (err) {
    res.status(400);
    res.json( err);
  }
};
*/

const plantRoutes = (app: express.Application) => {
  
  app.get('/plant', index),
  app.get('/plant/:id', show),
  app.post('/plant/create',verifyToken,  create),
  app.put('/plant/update',verifyToken,  update)

};
export default plantRoutes;
