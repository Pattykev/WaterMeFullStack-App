import supertest from 'supertest';
import jwt, { Secret } from 'jsonwebtoken';
import { User, UserQueries } from '../../models/user';
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

const userData: User = {
  userName: "pattykev",
  firstName: "TCHINGUÉ",
  lastName: "Patricia",
  password: "patty@2103"
};




describe('Product handler', () => {

  beforeAll( async()=>{
  const {body: userBody} = await request.post("/user/create").send(userData);
  token = userBody;
});

  afterAll( 
   async () => {
    const conn= await Client.connect();
    (await conn).query("delete from product");
    await conn.query("alter sequence product_id_seq restart with 1");
    conn.release();
   }
  );
  
  

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
      .get(`/product/1`)
      .set("Content-Type","Application/Json")
      .set("Accept","Application/Json");

    expect(res.status).toBe(200);
    
  });

  it('should delete the product ', async () => {
    const res = await request
      .delete(`/product/remove/1`)
      .set("Content-Type","Application/Json")
      .set("Accept","Application/Json")
      .set('Authorization', 'bearer ' + token);

    expect(res.status).toBe(200);
    
  });

  it('should update the product', async () => {
    const productData: Product = {
      id: 1,
      name: 'candy',
      price: 100,
      category: 'foods'
    };
    const res = await request
      .put('/product/update/1')
      .send(productData)
      .set("Content-Type","Application/Json")
      .set("Accept","Application/Json")
      .set('Authorization', 'bearer ' + token);
    expect(res.status).toBe(200);
    
  });
});
