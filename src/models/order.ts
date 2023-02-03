//@ts-ignore

import Client from '../database';

export enum OrderStatus{
  ACTIVE= 'active',
  COMPLETE= 'complete'

}

export type Order_Products = {
  id?: number;
  quantity: number;
  id_product: number;
  
};

export type Order = {
  id?: number;
  status?: string;
  id_user: number;
  products: Order_Products[];
  
};




export class OrderQueries {
  async show(id_user: number): Promise<Order[]> {
    try {
      //@ts-ignore
      const conn = await Client.connect();
      const sql ="select * from orders where id_user=$1 ";
      const result = await conn.query(sql, [id_user]);
      const order=result.rows;
      const ordersProductsSql= "select quantity, id_product from order_products where id_order=$1 ";
      const orders= [];
      for(const o of order){
         const ordersProductsRows= await conn.query(ordersProductsSql, [o.id]);
         orders.push({
          ...o,
          products:ordersProductsRows,
         });
      }
     

      conn.release();
      return orders;
      

    } catch (err) {
      throw new Error(`Could not get the order Error: ${err}`);
    }
  }

  async create(order: Order): Promise<Order> {
    const { status=OrderStatus.ACTIVE, id_user, products}= order;
    try {
      //@ts-ignore
      const conn = await Client.connect();
      const sql = 'insert into orders( status, id_user) values($1,$2) returning*';
      const result = await conn.query(sql, [ status, id_user]);
      const newOrder=result.rows[0];
      
      const ordersProductsSql = 'insert into order_products(id_order, id_product, quantity) values($1,$2,$3) returning*';
      const order_products=[];

      for(const product of products){
        const {id_product, quantity}=product;
        const {rows}=await conn.query(ordersProductsSql, [newOrder.id, id_product, quantity]);
        order_products.push(rows[0] );
     }
      conn.release();
      return  {
        ...newOrder,
        products:order_products,
       };
     
    } catch (err) {
      throw new Error(`Could not get  create the order Error: ${err}`);
    }
  }

  async deleteAll(): Promise<void> {
    try {
      //@ts-ignore
      const conn = await Client.connect();
      const sql = 'delete from orders ';
      const result = await conn.query(sql);
      const Ordersql = 'delete from order_products ';
      const results = await conn.query(Ordersql);
      conn.release();
      
    } catch (err) {
      throw new Error(`Could not delete the products Error: ${err}`);
    }
  }
}
