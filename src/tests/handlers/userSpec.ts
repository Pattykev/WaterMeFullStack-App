import supertest from "supertest";
import jwt, { Secret } from "jsonwebtoken";
import app from "../../server";
import { User } from "../../models/user";

const SECRET = process.env.TOKEN_SECRET as Secret;
const request = supertest(app);

describe('User handler', () => {
  const userData: User = {
    userName: "pattykev",
    firstName: "TCHINGUÉ",
    lastName: "Patricia",
    password: "patty@2103"
  };
  let token: string,
    userId : number;

  it("should gets the create endpoint ", async () => {
    const res = await request.post("/user/create").send(userData);
    const { body, status } = res;
    token = res.text;
    //@ts-ignore
    const { user } = jwt.verify(token, SECRET);
    userId = Number(user.id);
    expect(status).toBe(200);
    
  });

  it("should gets the index endpoint ", async () => {
    const res = await request
      .get("/user")
      .set("Authorization", "bearer " + token);

    expect(res.status).toBe(200);
    
  });

  it("should gets the show endpoint ", async () => {
    const res = await request
      .get(`/user/${userId}`)
      .set("Authorization", "bearer " + token);

    expect(res.status).toBe(200);
    
  });

  it("should gets the delete endpoint ", async () => {
    const res = await request
      .delete("/user/remove")
      .set("Authorization", "Bearer " + token);

    expect(res.status).toBe(200);
    
  });

  it('should gets the update endpoint ', async () => {
    const userData: User = {
      userName: "patty",
      firstName: "TCHINGUÉ",
      lastName: "Patricia",
      password: "patty@2103"
    };
    const res = await request
      .put("/user/update")
      .send(userData)
      .set("Authorization", "Bearer " + token);
    expect(res.status).toBe(200);
    
  });

  it('should gets the authenticate endpoint ', async () => {
    const res = await request
      .post("/user/authenticate")
      .send({ userName: userData.userName, password: userData.password })
      .set("Authorization", "bearer " + token);
    expect(res.status).toBe(200);
    
  });

  it("should not gets the authenticate endpoint ", async () => {
    const res = await request
      .post("/user/authenticate")
      .send({ userName: userData.userName, password: "qwertyuio" })
      .set("Authorization", "bearer " + token);
    expect(res.status).toBe(200);
    
  });
});
