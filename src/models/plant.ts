//@ts-ignore

import Client from '../database';

export type Plants = {
  id?: number;
  name: string;
  species: string;
  image?: File;
  watered?: boolean;
  quantity: string;
  frequency: string;
  id_user: number;
};

export type Notify = {
  username: string;
  name: string;
  species: string;
  quantity: number;
  frequency: number;
  
};

export type Watering = {
  id?: number;
  watered: boolean;
};

export class PlantsQueries {
  async index(): Promise<Plants[]> {
    try {
      //@ts-ignore
      const conn = await Client.connect();
      const sql = 'select * from plants';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Could not get any plants Error: ${err}`);
    }
  }

  async show(id: number): Promise<Plants> {
    try {
      //@ts-ignore
      const conn = await Client.connect();
      const sql = 'select * from plants where id=$1';
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not get the plant Error: ${err}`);
    }
  }

  async create(plant: Plants): Promise<Plants> {
    try {
      //@ts-ignore
      const conn = await Client.connect();
      const sql =
        'insert into plants(name, species, quantity, frequency, id_user) values($1, $2, $3, $4, $5) returning*';
      const result = await conn.query(sql, [
        plant.name,
        plant.species,
        plant.quantity,
        plant.frequency,
        plant.id_user
      ]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not get  create the plant Error: ${err}`);
    }
  }

  async notify(id: number): Promise<Notify> {
    try {
      //@ts-ignore
      const conn = await Client.connect();
      const sql = 'select username, name, species, quantity, frequency from plants, users where id_user=$1 and users.id=id_user and watered is false ';
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not get the plant Error: ${err}`);
    }
  }

  async deleteAll(): Promise<void> {
    try {
      //@ts-ignore
      const conn = await Client.connect();
      const sql = 'delete from plants ';
      const result = await conn.query(sql);
      conn.release();
      
    } catch (err) {
      throw new Error(`Could not delete the products Error: ${err}`);
    }
  }


  async update(plant: Watering): Promise<Watering> {
    try {
      //@ts-ignore
      const conn = await Client.connect();
      const sql =
        'update plants set  watered=$2 where id=$1 returning*';
      const result = await conn.query(sql, [
        plant.id,
        plant.watered
      ]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not update the plant Error: ${err}`);
    }
  }
/*
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
  
  */
}
