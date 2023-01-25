import supertest from 'supertest';
import jwt, { Secret } from 'jsonwebtoken';
import app from '../../server';
import { Product } from '../../models/product';

const SECRET = process.env.TOKEN_SECRET as Secret;
const request = supertest(app);

describe('Product handler', () => {
  const productData: Product = {
    name: 'candy',
    price: 50,
    category: 'foods'
  };
  let token: string, productId: number ;

  it('should gets the create endpoint ', async () => {
    const res = await request.post('/product/create').send(productData);
    const { body, status } = res;
    token = body;
    //@ts-ignore
    const { product } = jwt.verify(token, SECRET);
    productId = product.id;
    expect(status).toBe(200);
    
  });

  it('should gets the index endpoint ', async () => {
    const res = await request
      .get('/product')
      .set('Authorization', 'bearer ' + token);

    expect(res.status).toBe(200);
    
  });

  it('should gets the show endpoint ', async () => {
    const res = await request
      .get(`/product/${productId}`)
      .set('Authorization', 'bearer ' + token);

    expect(res.status).toBe(200);
    
  });

  it('should gets the delete endpoint ', async () => {
    const res = await request
      .delete(`/product/remove`)
      .set('Authorization', 'bearer ' + token);

    expect(res.status).toBe(200);
    
  });

  it('should gets the update endpoint ', async () => {
    const productData: Product = {
      name: 'candy',
      price: 100,
      category: 'foods'
    };
    const res = await request
      .put('/product/update')
      .send(productData)
      .set('Authorization', 'bearer ' + token);
    expect(res.status).toBe(200);
    
  });
});
