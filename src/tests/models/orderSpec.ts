import { Order, OrderQueries, OrderStatus } from "../../models/order";
import { User, UserQueries } from "../../models/user";
import { Product, ProductQueries } from "../../models/product";

const order = new OrderQueries();
const user = new UserQueries();
const product= new ProductQueries();
let o: Order;
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
    p = await product.create({
      name: "candy",
      price: 50,
      category: "foods"
    });
  });

  it("create method should add an order", async () => {
     o = await order.create({
      quantity: 34,
      status: OrderStatus.ACTIVE,
      id_user: Number (u.id),
      id_product: Number( p.id)
    });
    expect(o.quantity).toEqual(34);
    expect(o.status).toEqual(OrderStatus.ACTIVE);
    expect(Number(o.id_user)).toEqual(Number (u.id));
    expect(Number(o.id_product)).toEqual(Number (p.id));
   
  });

  it("show method should return a list of orders by a user", async () => {
    const result = await order.show(Number (u.id));
    expect(result[0].quantity).toEqual(34);
    expect(result[0].status).toEqual(OrderStatus.ACTIVE);
    expect(Number(result[0].id_user)).toEqual(Number (u.id));
    expect(Number(result[0].id_product)).toEqual(Number (p.id));
  });

  afterAll(async ()=>{
    await order.deleteAll();
    await product.deleteAll();
    await user.deleteAll();
    
  });
});
