import supertest from 'supertest';
import jwt, { Secret } from 'jsonwebtoken';
import app from '../../server';
import { Product } from '../../models/product';
import Client from '../../database';

const SECRET = process.env.TOKEN_SECRET as Secret;
const request = supertest(app);

let token: string, productId: number ;
const productData: Product = {
  name: 'candy',
  price: 50,
  category: 'foods'
};

  beforeAll( async()=>{
    const res = await request.post("/user/create").send(productData)
    .set("Content-Type","Application/Json")
    .set("Accept","Application/Json");
    token = res.body.token;
    productId = Number(res.body.id);
  });

  afterAll( 
   async () => {
    const conn= await Client.connect();
    (await conn).query("delete from product");
    conn.release();
   }
  );

describe('Product handler', () => {
  
  

  it('should create the product ', async () => {
    const res = await request.post('/product/create')
    .send(productData)
    .set("Content-Type","Application/Json")
    .set("Accept","Application/Json")
    .set('Authorization', 'bearer ' + token);
    expect(res.status).toBe(200);
    
  });

  it('should gets all the product ', async () => {
    const res = await request
      .get('/product')
      .set("Content-Type","Application/Json")
      .set("Accept","Application/Json");

    expect(res.status).toBe(200);
    
  });

  it('should show the product ', async () => {
    const res = await request
      .get(`/product/${productId}`)
      .set("Content-Type","Application/Json")
      .set("Accept","Application/Json");

    expect(res.status).toBe(200);
    
  });

  it('should delete the product ', async () => {
    const res = await request
      .delete(`/product/remove`)
      .set("Content-Type","Application/Json")
      .set("Accept","Application/Json")
      .set('Authorization', 'bearer ' + token);

    expect(res.status).toBe(200);
    
  });

  it('should update the product', async () => {
    const productData: Product = {
      id: productId,
      name: 'candy',
      price: 100,
      category: 'foods'
    };
    const res = await request
      .put('/product/update')
      .send(productData)
      .set("Content-Type","Application/Json")
      .set("Accept","Application/Json")
      .set('Authorization', 'bearer ' + token);
    expect(res.status).toBe(200);
    
  });
});
