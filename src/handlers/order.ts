import express, { Request, Response } from 'express';
import { Order, OrderQueries, Order_Products,OrderStatus } from '../models/order';
import  { verifyToken } from "../middleware/authenticate";

const orderHandler = new OrderQueries();

const show = async (req: Request, res: Response) => {
  try {
  const idUser=req.params.id as unknown as number ;
  if(!idUser){
    return res.status(401).send("Unauthorized user");
  }
  const order = await orderHandler.show(idUser);
  //if(order.length==0){
   // return res.status(404).send("No order to show");
 // }
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
      products:req.body. products as Order_Products[],
      status: req.body.status as OrderStatus,
      id_user: req.body.id_user as number
  
    };
    if( !order.status || !order.id_user || !order.products){
      return res.status(401).send("Missing value");
    }
    const newOrder = await orderHandler.create(order);
    res.status(200).json(newOrder);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};


const orderRoutes = (app: express.Application) => {
  app.get('/order/:id', verifyToken,show),
  app.post('/order/create', verifyToken, create)
};
export default orderRoutes;
