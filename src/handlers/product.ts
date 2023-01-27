import express, { Request, Response } from "express";
import { Product, ProductQueries } from "../models/product";
import jwt from "jsonwebtoken";
import auth from "../middleware/authenticate";

const productHandler = new ProductQueries();

const index = async (_req: Request, res: Response) => {
  try{
  const products = await productHandler.index();
  res.json({products});
  }
  catch (err) {
    res.status(500);
    res.json("Internal server error"+ err);
  }
};


const show = async (req: Request, res: Response) => {
 try  {
  const product = await productHandler.show(Number(req.params.id));
  res.json({product});
}
  catch (err) {
    res.status(500);
    res.json("Internal server error "+err);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const product: Product = {
      name: req.body.name,
      price: req.body.price,
      category: req.body.category
    };
    const newProduct = await productHandler.create(product);
    res.json({newProduct});
  } catch (err) {
    res.status(400);
    res.json({err});
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
    res.json({newProduct});
  } catch (err) {
    res.status(400);
    res.json({err});
  }
};

const remove = async (req: Request, res: Response) => {
  try{
  const deleteProduct = await productHandler.delete(req.body.id);
  res.json(deleteProduct);
}
  catch (err) {
    res.status(500);
    res.json("Internal server error  "+ err);
  }
};

const productRoutes = (app: express.Application) => {
  app.get('/product', index),
    app.get('/product/:id', show),
    app.post('/product/create',  create),
    app.put('/product/update',  update),
    app.delete('/product/remove',  remove);
};
export default productRoutes;
