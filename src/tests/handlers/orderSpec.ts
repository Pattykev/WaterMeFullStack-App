import supertest from 'supertest';
import jwt, { Secret } from 'jsonwebtoken';
import app from '../../server';
import { Order, OrderStatus } from '../../models/order';
import { User, UserQueries } from '../../models/user';
import { Product, ProductQueries } from '../../models/product';


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
let  productId: number, userId : number ;

describe('Order handler', () => {
  
  let token: string,
    orderId: number;

    it('should gets the create endpoint ', async () => {
      const res = await request.post('/product/create').send(productData);
      const { body, status } = res;
      token =body;
      //@ts-ignore
      const { product } = jwt.verify(token, SECRET);
      productId = product.id;
      expect(status).toBe(200);
      
    });
    it("should gets the create endpoint ", async () => {
      const res = await request.post("/user/create").send(userData);
      const { body, status } = res;
      token = body;
      //@ts-ignore
      const { user } = jwt.verify(token, SECRET);
      userId = user.id;
      expect(status).toBe(200);
      
    });

    const orderData: Order = {
      quantity: 34,
        status: OrderStatus.ACTIVE,
        id_user: Number (userId),
        id_product: Number(productId)
    };
  

  it('should gets the create endpoint ', async () => {
    const res = await request.post('/order/create').send(orderData);
    const { body, status } = res;
    token = body;
    //@ts-ignore
    const { order } = jwt.verify(token, SECRET);
    orderId = order.id;
    expect(status).toBe(200);
    
  });


  it('should gets the show endpoint ', async () => {
    const res = await request
      .get(`/order/${userId}`)
      .set('Authorization', 'bearer ' + token);

    expect(res.status).toBe(200);
    
  });


  
});
