import express, { Request, Response } from 'express';
import { Order, OrderQueries } from '../models/order';
import jwt from 'jsonwebtoken';

const orderHandler = new OrderQueries();

const show = async (req: Request, res: Response) => {
  const order = await orderHandler.show(Number(req.params.id));
  res.json(order);
};

const verifyAuthToken = (req: Request, res: Response, next: () => void) => {
  try {
    const authorizationHeader = String(req.headers.authorization);
    const token = String(authorizationHeader.split(' ')[1]);
    jwt.verify(token, String(process.env.TOKEN_SECRET));
    next();
  } catch (err) {
    res.status(401);
    res.json('Access denied, invalid token');
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const order: Order = {
      id_user: req.body.id_user,
      status: req.body.status
    };
    const newOrder = await orderHandler.create(order);
    res.json(newOrder);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const update = async (req: Request, res: Response) => {
  try {
    const order: Order = {
      id: req.body.id,
      id_user: req.body.id_user,
      status: req.body.status
    };
    const newOrder = await orderHandler.update(order);
    res.json(newOrder);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const orderRoutes = (app: express.Application) => {
  app.get('/order/:id', show),
  app.post('/order/create', verifyAuthToken, create),
  app.put('/order/update', verifyAuthToken, update);
};
export default orderRoutes;
