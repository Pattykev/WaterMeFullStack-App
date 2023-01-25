import supertest from 'supertest';
import jwt, { Secret } from 'jsonwebtoken';
import app from '../../server';
import { Order } from '../../models/order';

const SECRET = process.env.TOKEN_SECRET as Secret;
const request = supertest(app);

describe('Order handler', () => {
  const orderData: Order = {
    status: 'active',
    id_user: 1
  };
  let token: string,
    orderId: number;

  it('should gets the create endpoint ', async () => {
    const res = await request.post('/order/create').send(orderData);
    const { body, status } = res;
    token = body;
    //@ts-ignore
    const { order } = jwt.verify(token, SECRET);
    orderId = order.id;
    expect(status).toBe(200);
    
  });

  it('should gets the index endpoint ', async () => {
    const res = await request
      .get('/order')
      .set('Authorization', 'bearer ' + token);

    expect(res.status).toBe(200);
   
  });

  it('should gets the show endpoint ', async () => {
    const res = await request
      .get(`/order/${orderId}`)
      .set('Authorization', 'bearer ' + token);

    expect(res.status).toBe(200);
    
  });

  it('should gets the delete endpoint ', async () => {
    const res = await request
      .delete(`/order/remove`)
      .set('Authorization', 'bearer ' + token);

    expect(res.status).toBe(200);
    
  });

  it('should gets the update endpoint ', async () => {
    const orderData: Order = {
      status: 'complete',
      id_user: 1
    };
    const res = await request
      .put('/order/update')
      .send(orderData)
      .set('Authorization', 'bearer ' + token);
    expect(res.status).toBe(200);
    
  });
});
