import express, { Request, Response } from 'express';
import { Product, ProductQueries } from '../models/product';
import jwt from 'jsonwebtoken';

const productHandler = new ProductQueries();

const index = async (_req: Request, res: Response) => {
  const products = await productHandler.index();
  res.json(products);
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

const show = async (req: Request, res: Response) => {
  const product = await productHandler.show(Number(req.params.id));
  res.json(product);
};

const create = async (req: Request, res: Response) => {
  try {
    const product: Product = {
      name: req.body.name,
      price: req.body.price,
      category: req.body.category
    };
    const newProduct = await productHandler.create(product);
    res.json(newProduct);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const update = async (req: Request, res: Response) => {
  try {
    const product: Product = {
      id: req.body.id,
      name: req.body.name,
      price: req.body.price,
      category: req.body.category
    };
    const newProduct = await productHandler.update(product);
    res.json(newProduct);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const remove = async (req: Request, res: Response) => {
  const deleteProduct = await productHandler.delete(req.body.id);
  res.json(deleteProduct);
};

const productRoutes = (app: express.Application) => {
  app.get('/product', index),
    app.get('/product/:id', show),
    app.post('/product/create', verifyAuthToken, create),
    app.put('/product/update', verifyAuthToken, update),
    app.delete('/product/remove', verifyAuthToken, remove);
};
export default productRoutes;
