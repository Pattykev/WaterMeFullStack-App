import express, { Request, Response } from 'express';
import { Order, OrderQueries } from '../models/order';
import jwt from 'jsonwebtoken';
import auth from "../middleware/authenticate";

const orderHandler = new OrderQueries();

const show = async (req: Request, res: Response) => {
  try {
  const order = await orderHandler.show(Number(req.params.id));
  res.json({order});
}
  catch (err) {
    res.status(500);
    res.json("Internal server error"+ err);
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
    const newOrder = await orderHandler.create(order);
    res.json({newOrder});
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};


const orderRoutes = (app: express.Application) => {
  app.get('/order/:id', show),
  app.post('/order/create', create)
};
export default orderRoutes;
