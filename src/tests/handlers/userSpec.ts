import supertest from "supertest";
import jwt, { Secret } from "jsonwebtoken";
import app from "../../server";
import { User } from "../../models/user";
import Client from "../../database";

const SECRET = process.env.TOKEN_SECRET as Secret;
const request = supertest(app);

const userData: User = {
  userName: "pattykev",
  firstName: "TCHINGUÉ",
  lastName: "Patricia",
  password: "patty@2103"
};
let token: string,
  userId : number;

beforeAll( async()=>{
  const res = await request.post("/user/create").send(userData)
  .set("Content-Type","Application/Json")
  .set("Accept","Application/Json");
  token = res.body.token;
  userId = Number(res.body.id);
});

afterAll( 
 async () => {
  const conn= await Client.connect();
  (await conn).query("delete from users");
  conn.release();
 }
);

describe('User handler', () => {
  
  

  describe("Users routes tests", () => {
    
    it('should gets create the user  ', async () => {
      const res = await request.post('/user/create')
      .send(userData)
      .set("Content-Type","Application/Json")
      .set("Accept","Application/Json");
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

  it("should  delete the user ", async () => {
    const res = await request
      .delete("/user/remove")
      .set("Content-Type","Application/Json")
      .set("Accept","Application/Json")
      .set("Authorization", "Bearer " + token);

    expect(res.status).toBe(200);
    
  });

  it('should update the user ', async () => {
    const userData: User = {
      id: userId,
      userName: "patty",
      firstName: "TCHINGUÉ",
      lastName: "Patricia",
      password: "patty@2103"
    };
    const res = await request
      .put("/user/update")
      .send(userData)
      .set("Content-Type","Application/Json")
      .set("Accept","Application/Json")
      .set("Authorization", "Bearer " + token);
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
    expect(res.status).toBe(200);
    
  });
});
});
