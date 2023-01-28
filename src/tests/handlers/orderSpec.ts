import supertest from 'supertest';
import jwt, { Secret } from 'jsonwebtoken';
import app from '../../server';
import { Order, OrderStatus } from '../../models/order';
import { User, UserQueries } from '../../models/user';
import { Product, ProductQueries } from '../../models/product';
import Client from '../../database';

const SECRET = process.env.TOKEN_SECRET as Secret;
const request = supertest(app);

const userData: User = {
  userName: "pattykev",
  firstName: "TCHINGUÉ",
  lastName: "Patricia",
  password: "patty@2103"
};

const productData: Product = {
  name: 'candy',
  price: 50,
  category: 'foods'
};

let  productId: number=1, userId : number=1, token:string ;

beforeAll( async()=>{
  const res = await request.post("/user/create").send(userData)
  .set("Content-Type","Application/Json")
  .set("Accept","Application/Json");
  token = res.body.token;
  userId = Number(res.body.id);

  const res2 = await request.post("/user/create").send(productData)
  .set("Content-Type","Application/Json")
  .set("Accept","Application/Json");
  token = res.body.token;
  productId = Number(res2.body.id);
});

afterAll( 
 async () => {
  const conn= await Client.connect();
  (await conn).query("delete from users");
  conn.release();

  const con= await Client.connect();
  (await con).query("delete from product");
  con.release();

  const connection= await Client.connect();
  (await connection).query("delete from orders");
  connection.release();
 }
);
const order: Order={
  quantity:1,
  status: OrderStatus.ACTIVE,
  id_user: Number(userId),
  id_product:Number(productId)
}

describe('Order handler', () => {
  
  let token: string,
    orderId: number;
    

    const orderData: Order = {
      quantity: 34,
        status: OrderStatus.ACTIVE,
        id_user: Number (userId),
        id_product: Number(productId)
    };
  

  it('should  create the order ', async () => {
    const res = await request.post('/order/create')
    .send(orderData)
    .set('Authorization', 'bearer ' + token);
     
    expect(res.status).toBe(200);
   
    
  });


  it('should show the order', async () => {
    const res = await request
      .get(`/order/${userId}`)
      .set('Authorization', 'bearer ' + token);

    expect(res.status).toBe(200);
    

  });


  
});
