import { Order, OrderQueries } from '../../models/order';
import { User, UserQueries } from '../../models/user';

const order = new OrderQueries();
const user = new UserQueries();
let o: Order;
let u: User;

describe('Testing order Model', () => {
  it('should have a show method', () => {
    expect(order.show).toBeDefined();
  });

  it('should have an update method', () => {
    expect(order.update).toBeDefined();
  });

  it('should have a create method', () => {
    expect(order.create).toBeDefined();
  });

  beforeAll(async ()=> {
    u = await user.create({
      userName: 'Patty',
      firstName: 'TCHINGUÉ',
      lastName: 'Patricia',
      password: 'Patty@2003'
    });
  });

  it('create method should add an order', async () => {
     o = await order.create({
      status: 'active',
      id_user: 1
    });
    expect(o.status).toEqual('active');
    expect(o.id_user).toEqual(u.id as unknown as number);
   
  });

  it('show method should return an active order', async () => {
    const result = await order.show(u.id as number);

    expect(result[0].status).toEqual('active');
    expect(result[0].id_user).toEqual(u.id  as number);
  });

  it('update method should return a modified order', async () => {
    const o1: Order = {
      id: o.id,
      id_user: u.id as unknown as number,
      status: 'complete'
    };
    const result = await order.update(o1);
    expect(o1.status).toEqual('complete');
    expect(o1.id_user).toEqual(u.id as unknown as number);
  });
  it('delete method should remove all the product', async () => {
   await order.deleteAll();
   const result = await order.show(u.id as unknown as number);
    expect(result.length).toEqual(0);
    
  });
  afterAll(async ()=>{
    await order.deleteAll();
  });
});
