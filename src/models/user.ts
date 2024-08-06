//@ts-ignore

import Client from '../database';
import bcrypt from 'bcrypt';

export type User = {
  id?: number;
  userName: string;
  email: string;
  password: string;
};
const salt_rounds: number = parseInt(process.env.SALT_ROUNDS as string);
const pepper: string = process.env.BCRYPT_PASSWORD as string;

export class UserQueries {
  async index(): Promise<User[]> {
    try {
      //@ts-ignore
      const conn = await Client.connect();
      const sql = 'select * from users';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Could not get any user Error: ${err}`);
    }
  }

  async show(id: number): Promise<User> {
    try {
      //@ts-ignore
      const conn = await Client.connect();
      const sql = 'select * from users where id=$1';
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not get the user Error: ${err}`);
    }
  }

  async create(user: User): Promise<User> {
    try {
      //@ts-ignore
      const conn = await Client.connect();
      const sql =
        'insert into users(username, email, password) values($1, $2, $3) returning *';
      const hash = bcrypt.hashSync(user.password + pepper, salt_rounds);
      const result = await conn.query(sql, [
        user.userName,
        user.email,
        hash
      ]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not get  create the user Error: ${err}`);
    }
  }
/*
  async update(user: User): Promise<User> {
    try {
      //@ts-ignore
      const conn = await Client.connect();
      const sql =
        'update users set username=$2, firstname=$3, lastname=$4, password=$5  where id=$1 returning*';
      const hash = bcrypt.hashSync(user.password + pepper, salt_rounds);
      const result = await conn.query(sql, [
        user.id,
        user.userName,
        user.firstName,
        user.lastName,
        hash
      ]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not  update the user Error: ${err}`);
    }
  }

  async delete(id: number): Promise<User> {
    try {
      //@ts-ignore
      const conn = await Client.connect();
      const sql = 'delete from users where id=$1';
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not delete the user Error: ${err}`);
    }
  }
*/
  async authenticate(userName: string, password: string): Promise<User | null> {
    //@ts-ignore
    const conn = await Client.connect();
    const sql = 'select password from users where username=$1';
    const result = await conn.query(sql, [userName]);
    if (result.rows.length) {
      const user = result.rows[0];
      if (bcrypt.compareSync(password + pepper, user.password)) {
        return user;
      }
    }
    return null;
  }
  
  async deleteAll(): Promise<void> {
    try {
      //@ts-ignore
      const conn = await Client.connect();
      const sql = 'delete from users ';
      const result = await conn.query(sql);
      conn.release();
      
    } catch (err) {
      throw new Error(`Could not delete the products Error: ${err}`);
    }
  }
  
}
