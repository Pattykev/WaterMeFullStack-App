//@ts-ignore

import Client from '../database';

export type Order = {
  id?: number;
  id_user: number;
  status: string;
};
export class OrderQueries {
  async show(id_user: number): Promise<Order[]> {
    try {
      //@ts-ignore
      const conn = await Client.connect();
      const sql = "select* from orders where id_user($1) and status='active'";
      const result = await conn.query(sql, [id_user]);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Could not get the order Error: ${err}`);
    }
  }

  async create(order: Order): Promise<Order> {
    try {
      //@ts-ignore
      const conn = await Client.connect();
      const sql = 'insert into orders(status,id_user) values($1,$2) returning*';
      const result = await conn.query(sql, [order.status, order.id_user]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not get  create the order Error: ${err}`);
    }
  }

  async update(order: Order): Promise<Order> {
    try {
      //@ts-ignore
      const conn = await Client.connect();
      const sql =
        'update orders set  status=$2, id_user=$3 where id=$1 returning*';
      const result = await conn.query(sql, [
        order.id,
        order.id_user,
        order.status
      ]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not update the order Error: ${err}`);
    }
  }
  async deleteAll(): Promise<void> {
    try {
      //@ts-ignore
      const conn = await Client.connect();
      const sql = 'delete from orders ';
      const result = await conn.query(sql);
      conn.release();
      
    } catch (err) {
      throw new Error(`Could not delete the products Error: ${err}`);
    }
  }
}
