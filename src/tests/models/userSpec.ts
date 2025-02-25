import { User, UserQueries } from "../../models/user";
import Client from "../../database";

const user = new UserQueries();
let u: User;

describe("Testing user Model", () => {
  it("should have an index method", () => {
    expect(user.index).toBeDefined();
  });

  it("should have a show method", () => {
    expect(user.show).toBeDefined();
  });


  it("should have a create method", () => {
    expect(user.create).toBeDefined();
  });

  it("should have an authenticate method", () => {
    expect(user.authenticate).toBeDefined();
  });

  it("create method should add an user", async () => {
    u= await user.create({
      userName: "Patty",
      email: "Patricia@gmail.com",
      password: "Patty@2003"
    });
    expect(u).toBeDefined();
  });

  it("index method should return a list of users", async () => {
    const result:User[] = await user.index();
  
    expect(result).not.toBeNull();
  });

  it("show method should return an user", async () => {
    const result:User = await user.show(Number(u.id));
    expect(result).not.toBeNull();
  });


  it("authenticate method should validate the user", async () => {
    const result= await user.authenticate("Patty", "Patty@2003");
    expect(result).not.toBeNull;
    if (result) {
      expect(result.userName).not.toBeNull();
      expect (result.email).not.toBeNull();
    }
  });

  it("authenticate method should  not validate the user", async () => {
    const result = await user.authenticate("Patty", "Patty@2003Kev");
    expect(result).toBeNull;
  });
  
  it("delete method should remove all the product", async () => {
    await user.deleteAll();
    const results = await user.index();
    expect(results.length).toEqual(0);
  });
  afterAll(async ()=>{
    await user.deleteAll();
    const conn=await Client.connect();
    await conn.query("alter sequence users_id_seq restart with 1");
  });

});
