//@ts-ignore

import Client from '../database';

export type Product = {
  id?: number;
  name: string;
  price: number;
  category?: string;
};
export class ProductQueries {
  async index(): Promise<Product[]> {
    try {
      //@ts-ignore
      const conn = await Client.connect();
      const sql = 'select * from product';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Could not get any product Error: ${err}`);
    }
  }

  async show(id: number): Promise<Product> {
    try {
      //@ts-ignore
      const conn = await Client.connect();
      const sql = 'select * from product where id=$1';
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not get the product Error: ${err}`);
    }
  }

  async create(product: Product): Promise<Product> {
    try {
      //@ts-ignore
      const conn = await Client.connect();
      const sql =
        'insert into product(name, price, category) values($1, $2, $3) returning*';
      const result = await conn.query(sql, [
        product.name,
        product.price,
        product.category
      ]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not get  create the product Error: ${err}`);
    }
  }

  async update(product: Product): Promise<Product> {
    try {
      //@ts-ignore
      const conn = await Client.connect();
      const sql =
        'update product set name=$2, price=$3, category=$4 where id=$1 returning*';
      const result = await conn.query(sql, [
        product.id,
        product.name,
        product.price,
        product.category
      ]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not update the product Error: ${err}`);
    }
  }

  async delete(id: number): Promise<Product> {
    try {
      //@ts-ignore
      const conn = await Client.connect();
      const sql = 'delete from product where id=$1';
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not delete the product Error: ${err}`);
    }
  }
  async deleteAll(): Promise<void> {
    try {
      //@ts-ignore
      const conn = await Client.connect();
      const sql = 'delete from product ';
      const result = await conn.query(sql);
      conn.release();
      
    } catch (err) {
      throw new Error(`Could not delete the products Error: ${err}`);
    }
  }
}
