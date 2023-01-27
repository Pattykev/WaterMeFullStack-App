import { User, UserQueries } from "../../models/user";

const user = new UserQueries();
let u: User;

describe("Testing user Model", () => {
  it("should have an index method", () => {
    expect(user.index).toBeDefined();
  });

  it("should have a show method", () => {
    expect(user.show).toBeDefined();
  });

  it("should have an update method", () => {
    expect(user.update).toBeDefined();
  });

  it("should have a delete method", () => {
    expect(user.delete).toBeDefined();
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
      firstName: "TCHINGUÉ",
      lastName: "Patricia",
      password: "Patty@2003"
    });
    expect(String(u.userName)).toEqual("Patty");
    expect(String(u.firstName)).toEqual("TCHINGUÉ");
    expect(String(u.lastName)).toEqual("Patricia");
    
  });

  it("index method should return a list of users", async () => {
    const result:User[] = await user.index();
   
    expect(String(result[0].userName)).toEqual("Patty");
    expect(String(result[0].firstName)).toEqual("TCHINGUÉ");
    expect(String(result[0].lastName)).toEqual("Patricia");
  });

  it("show method should return an user", async () => {
    const result:User = await user.show(Number(u.id));
    expect(String(result.userName)).toEqual("Patty");
    expect (String(result.firstName)).toEqual("TCHINGUÉ");
    expect(String(result.lastName)).toEqual("Patricia");
  });

  it("update method should return a modified user", async () => {
   const u1: User = {
      id: Number(u.id),
      userName: "Patty",
      firstName: "TCHINGUE",
      lastName: "Kevine",
      password: "Patty@2003"
    };
    const result: User = await user.update(u1);
    expect(String(result.userName)).toEqual("Patty");
    expect(String(result.firstName)).toEqual("TCHINGUE");
    expect(String(result.lastName)).toEqual("Kevine");
  });

  it("authenticate method should validate the user", async () => {
    const result= await user.authenticate("Patty", "Patty@2003");
    expect(result).not.toBeNull;
    if (result) {
      expect(result.userName).toEqual("Patty");
      expect(result.firstName).toEqual("TCHINGUÉ");
      expect(result.lastName).toEqual("Kévine");
    }
  });

  it("authenticate method should  not validate the user", async () => {
    const result = await user.authenticate("Patty", "Patty@2003Kev");
    expect(result).toBeNull;
  });

  it("delete method should remove the user", async () => {
     await user.delete(Number(u.id));
    const results = await user.index();
    expect(results).toEqual([]);
  });
  it("delete method should remove all the product", async () => {
    await user.deleteAll();
    const results = await user.index();
    expect(results.length).toEqual(0);
  });
  afterAll(async ()=>{
    await user.deleteAll();
  });

});
