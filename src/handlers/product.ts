import express, { Request, Response } from "express";
import { Product, ProductQueries } from "../models/product";
import jwt from "jsonwebtoken";
import auth from "../middleware/authenticate";

const productHandler = new ProductQueries();

const index = async (_req: Request, res: Response) => {
  try{
  const products = await productHandler.index();
if(products.length==0){
  return res.status(404).json(products);
}
  res.status(200).json(products);
  }
  catch (err) {
    res.status(400);
    res.json( err);
  }
};


const show = async (req: Request, res: Response) => {
 try  {
  const product = await productHandler.show(Number(req.params.id));
  if(!product){
    return res.status(404).json(product);
  }
    res.status(200).json(product);
}
  catch (err) {
    res.status(400);
    res.json(err);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const product: Product = {
      name: req.body.name,
      price: req.body.price,
      category: req.body.category
    };
    if(!product.name || !product.price || !product.category){
      return res.status(404).json(product);
    }
     
    const newProduct = await productHandler.create(product);
    res.status(200).json({newProduct});
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
    if(!product.name || !product.price || !product.category){
      return res.status(404).json(product);
    }
    const newProduct = await productHandler.update(product);
    res.status(200).json({newProduct});
  } catch (err) {
    res.status(400);
    res.json({err});
  }
};

const remove = async (req: Request, res: Response) => {
  try{
  const deleteProduct = await productHandler.delete(req.body.id);
  res.status(200).json(deleteProduct);
}
  catch (err) {
    res.status(400);
    res.json( err);
  }
};

const productRoutes = (app: express.Application) => {
  app.get('/product', index),
    app.get('/product/:id', show),
    app.post('/product/create',auth,  create),
    app.put('/product/update', auth, update),
    app.delete('/product/remove', auth, remove);
};
export default productRoutes;
