import { Order, OrderQueries, OrderStatus, Order_Products } from "../../models/order";
import { User, UserQueries } from "../../models/user";
import { Product, ProductQueries } from "../../models/product";
import Client from "../../database";

const order = new OrderQueries();
const user = new UserQueries();
const product= new ProductQueries();
let o, orderObject: Order;
let u: User;
let p: Product;

describe("Testing order Model", () => {
  it("should have a show method", () => {
    expect(order.show).toBeDefined();
  });

  it("should have a create method", () => {
    expect(order.create).toBeDefined();
  });

  beforeAll(async ()=> {
    u = await user.create({
      userName: "Patty",
      firstName: "TCHINGUÉ",
      lastName: "Patricia",
      password: "Patty@2003"
    });
    let userId=u.id;
    p = await product.create({
      name: "candy",
      price: 50,
      category: "foods"
    });
    let productId=p.id;

    orderObject={
      products:[{
        quantity:5,
        id_product:productId as unknown as number
    }],
    id_user: userId as unknown as number,
    status: OrderStatus.ACTIVE
    };

  });

  it("create method should add an order", async () => {
     o = await order.create(orderObject );
    expect(o).toBeDefined();
   
  });

  it("show method should return a list of orders by a user", async () => {
    o = await order.create(orderObject );
    const result = await order.show(Number (o.id));
    expect(result).toBeDefined();
  
  });

  afterAll(async ()=>{
    await order.deleteAll();
    await product.deleteAll();
    await user.deleteAll();
    const conn=await Client.connect();
    await conn.query("alter sequence users_id_seq restart with 1");
    await conn.query("alter sequence orders_id_seq restart with 1");
    await conn.query("alter sequence product_id_seq restart with 1");
    
  });
});
