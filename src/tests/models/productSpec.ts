import { Product, ProductQueries } from "../../models/product";
import Client from "../../database";

const product = new ProductQueries();
let products:Product;

describe("Testing Product Model", () => {
  it("should have an index method", () => {
    expect(product.index).toBeDefined();
  });

  it("should have a show method", () => {
    expect(product.show).toBeDefined();
  });

  it("should have an update method", () => {
    expect(product.update).toBeDefined();
  });

  it("should have a delete method", () => {
    expect(product.delete).toBeDefined();
  });

  it("should have a create method", () => {
    expect(product.create).toBeDefined();
  });

  it("create method should add a product", async () => {
    products = await product.create({
      name: "candy",
      price: 50,
      category: "foods"
    });
    expect(products.name).toEqual("candy");
    expect(products.price).toEqual(50);
    expect(products.category).toEqual("foods");
  });


  it("index method should return a list of products", async () => {
    const result: Product[] = await product.index();
    expect(result).not.toBeNull();
   
  });

  it("show method should return a product", async () => {
   
    const result = await product.show(Number(products.id));
    expect(result).not.toBeNull();
    
  });

  it("update method should return a modified product", async () => {
    const p: Product = {
      id: Number(products.id),
      name: "rice",
      price: 25000,
      category: "foods"
    };
    const result: Product = await product.update(p);
    
    expect(result).not.toBeNull();
   
  });

  it("delete method should remove the product", async () => {
    const result = await product.delete(Number(products.id));
    const results = await product.index();
    expect(results).toEqual([]);
  });
  it("delete method should remove all the product", async () => {
    await product.deleteAll();
    const results = await product.index();
    expect(results.length).toEqual(0);
  });
  afterAll(async ()=>{
    await product.deleteAll();
    const conn=await Client.connect();
    await conn.query("alter sequence product_id_seq restart with 1");
  });
});
