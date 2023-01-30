import supertest from 'supertest';
import jwt, { Secret } from 'jsonwebtoken';
import app from '../../server';
import { Order, OrderStatus , OrderQueries} from '../../models/order';
import { User, UserQueries } from '../../models/user';
import { Product, ProductQueries } from '../../models/product';
import Client from '../../database';

const SECRET = process.env.TOKEN_SECRET as Secret;
const request = supertest(app);
let token:string, userId: number;
let user:User;

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


beforeAll( async()=>{
  const {body: userBody} = await request.post("/user/create").send(userData);
  token = userBody;
  user=jwt.decode(token) as User;
  
  
  
  
  
  spyOn(OrderQueries.prototype, 'create').and.returnValue(
    Promise.resolve({
      id:1,
      products:[
        {
          id_product:5,
          quantity:5,
        },  
      ],
      id_user:1,
      status:OrderStatus.ACTIVE,
    })
  );

  
});

afterAll( 
 async () => {
  const conn= await Client.connect();
  await conn.query("delete from users");
  await conn.query("delete from product");
  await conn.query("delete from orders");
  await conn.query("alter sequence users_id_seq restart with 1");
  await conn.query("alter sequence orders_id_seq restart with 1");
  await conn.query("alter sequence product_id_seq restart with 1");
  await conn.query("alter sequence order_products_id_seq restart with 1");
  conn.release();
 }
);


describe('Order handler', () => {


  it('should  create the order ', async () => {
   
    const res = await request.post('/order/create')
    .send({id:1,
      products:[
        {
          id_product:5,
          quantity:5,
        },  
      ],
      id_user:1,
      status:OrderStatus.ACTIVE})
    .set('Authorization', 'bearer ' + token);
   
     
    expect(res.status).toBe(200);
 
    
  });


  it('should show the order', async () => {
    try{
    const res = await request
      .get(`/order/1`)
      .set('Authorization', 'bearer ' + token);

    expect(res.status).toBe(200);
    }
    catch(error){
      console.log(error);
    }
    

  });


  
});
