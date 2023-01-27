//@ts-ignore

import Client from '../database';

export enum OrderStatus{
  ACTIVE= 'active',
  COMPLETE= 'complete'

}

export type Order = {
  id?: number;
  quantity: number;
  status: string;
  id_user: number;
  id_product: number;
  
};
export class OrderQueries {
  async show(id_user: number): Promise<Order[]> {
    try {
      //@ts-ignore
      const conn = await Client.connect();
      const sql = "select * from orders where id_user=$1 ";
      const result = await conn.query(sql, [id_user]);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Could not get the order Error: ${err}`);
    }
  }

  async create({quantity, status=OrderStatus.ACTIVE, id_user, id_product}: Order): Promise<Order> {
    try {
      //@ts-ignore
      const conn = await Client.connect();
      const sql = 'insert into orders(quantity, status, id_user, id_product) values($1,$2,$3,$4) returning*';
      const result = await conn.query(sql, [quantity, status, id_user, id_product]);
      conn.release();
      return result.rows[0];
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
      conn.release();
      
    } catch (err) {
      throw new Error(`Could not delete the products Error: ${err}`);
    }
  }
}
