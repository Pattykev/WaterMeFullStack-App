import supertest from "supertest";
import jwt, { Secret } from "jsonwebtoken";
import app from "../../server";
import { User, UserQueries } from "../../models/user";
import Client from "../../database";

const SECRET = process.env.TOKEN_SECRET as Secret;
const request = supertest(app);
const user=new UserQueries();

const userData: User = {
  userName: "pattykev",
  email: "Patricia@gmail.com",
  password: "patty@2103"
};
let token: string,
  userId : number;


describe('User handler', () => {

 
beforeAll( async()=>{
  const res = await user.create(userData);
  userId = Number(res.id);
});

afterAll( 
 async () => {
  const conn= await Client.connect();
await conn.query("delete from users");
await conn.query("alter sequence users_id_seq restart with 1");
  conn.release();
 });
    
    it('should gets create the user  ', async () => {
      const res = await request.post('/user/create')
      .send(userData)
      .set("Content-Type","Application/Json")
      .set("Accept","Application/Json");
      token = res.body;
      expect(res.status).toBe(200);
      
    });

  it("should gets all users ", async () => {
    const res = await request
      .get("/user")
      .set("Content-Type","Application/Json")
      .set("Accept","Application/Json")
      .set("Authorization", "Bearer " + token);

    expect(res.status).toBe(200);
    
  });

  it("should gets the user ", async () => {
    const res = await request
      .get(`/user/${userId}`)
      .set("Content-Type","Application/Json")
      .set("Accept","Application/Json")
      .set("Authorization", "bearer " + token);

    expect(res.status).toBe(200);
    
  });

  it('should  authenticate the user ', async () => {
    const res = await request
      .post("/user/authenticate")
      .send({ userName: userData.userName, password: userData.password })
      .set("Authorization", "Bearer " + token);
    expect(res.status).toBe(200);
    
  });

  it("should not authenticate the user", async () => {
    const res = await request
      .post("/user/authenticate")
      .send({ userName: userData.userName, password: "qwertyuio" })
      .set("Authorization", "Bearer " + token);
    expect(res.status).toBe(404);
    
  });
});

