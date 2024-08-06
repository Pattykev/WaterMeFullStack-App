import { Plants, PlantsQueries } from "../../models/plant";
import Client from "../../database";
import { User, UserQueries } from "../../models/user";

const plant = new PlantsQueries();
let plants:Plants;
let user = new UserQueries();
let u : User;

describe("Testing Plant Model", () => {
  it("should have an index method", () => {
    expect(plant.index).toBeDefined();
  });

  it("should have a show method", () => {
    expect(plant.show).toBeDefined();
  });

  it("should have a create method", () => {
    expect(plant.create).toBeDefined();
  });

  beforeAll(async () => {
    u = await user.create({
      userName: "Patty",
      email: "Patricia@gmail.com",
      password: "Patty@2003"
    });
  });

  it("create method should add a plant", async () => {
    plants = await plant.create({
      name: 'maize',
      species: 'cereal',
      quantity: '1 litre',
      frequency: '3 fois par jours',
      id_user: Number(u.id)
    });
    expect(plants).toBeDefined();
  });


  it("index method should return a list of plants", async () => {
    const result: Plants[] = await plant.index();
    expect(result).not.toBeNull();
   
  });

  it("show method should return a plant", async () => {
   
    const result = await plant.show(Number(plants.id));
    expect(result).not.toBeNull();
    
  });

  afterAll(async ()=>{
    await plant.deleteAll();
    const conn=await Client.connect();
    await conn.query("alter sequence plants_id_seq restart with 1");
  });
});
