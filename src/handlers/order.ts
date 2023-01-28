import express, { Request, Response } from 'express';
import { Order, OrderQueries } from '../models/order';
import jwt from 'jsonwebtoken';
import auth, { JwtPayLoad } from "../middleware/authenticate";

const orderHandler = new OrderQueries();

const show = async (req: JwtPayLoad , res: Response) => {
  try {
  const idUser: number | undefined =req.user?.id;
  if(!idUser){
    return res.status(401).json("Unauthorized user");
  }
  const order = await orderHandler.show(idUser);
  if(order.length==0){
    return res.status(404).json(order);
  }
  res.status(200).json(order);
}
  catch (err) {
    res.status(400);
    res.json(err);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const order: Order = {
      quantity:req.body.quantity,
      status: req.body.status,
      id_user: req.body.id_user,
      id_product: req.body.id_product
    };
    if(!order.quantity || !order.status || !order.id_user || !order.id_product){
      return res.status(401).json(order);
    }
    const newOrder = await orderHandler.create(order);
    res.status(200).json(newOrder);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};


const orderRoutes = (app: express.Application) => {
  app.get('/order/:id', auth,show),
  app.post('/order/create', auth, create)
};
export default orderRoutes;
