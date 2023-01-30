import express, { Request, Response } from "express";
import { Product, ProductQueries } from "../models/product";
import {verifyToken} from "../middleware/authenticate";

const productHandler = new ProductQueries();

const index = async (_req: Request, res: Response) => {
  try{
  const products = await productHandler.index();
if(products.length==0){
  return res.status(404).send("no products found");
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
    return res.status(404).send("no product found");
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
      return res.status(404).send("missing value");
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
      id: req.params.id as unknown as number ,
      name: req.body.name,
      price: req.body.price,
      category: req.body.category
    };
    if(!product.name || !product.price || !product.category){
      return res.status(404).send("missing value");
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
  const deleteProduct = await productHandler.delete(Number(req.params.id));
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
    app.post('/product/create',verifyToken,  create),
    app.put('/product/update/:id',verifyToken, update),
    app.delete('/product/remove/:id',verifyToken, remove);
};
export default productRoutes;
