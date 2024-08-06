import supertest from 'supertest';
import jwt, { Secret } from 'jsonwebtoken';
import { User, UserQueries } from '../../models/user';
import app from '../../server';
import { Plants, PlantsQueries } from '../../models/plant';
import Client from '../../database';

const SECRET = process.env.TOKEN_SECRET as Secret;
const request = supertest(app);

let token: string, plantId: number ;
let user:User;

const userData: User = {
  userName: "pattykev",
  email: "Patricia@gmail.com",
  password: "patty@2103"
};

const plantData: Plants = {
  name: 'maize',
  species: 'cereal',
  quantity: '1 litre',
  frequency: '3 fois par jours',
  id_user: userData.id as number
};



describe('Plant handler', () => {

  beforeAll( async()=>{
    const {body: userBody} = await request.post("/user/create").send(userData);
    token = userBody;

    spyOn(PlantsQueries.prototype, 'create').and.returnValue(
      Promise.resolve({
        id_plant:1,
        name: 'maize',
        species: 'cereal',
        quantity: '1 litre',
        frequency: '3 fois par jours',
        id_user: 1
      })
    );
});

  afterAll(
    async () => {
      const conn= await Client.connect();
      await conn.query("delete from users");
      await conn.query("delete from plants");
      await conn.query("alter sequence users_id_seq restart with 1");
      await conn.query("alter sequence plants_id_seq restart with 1");
      conn.release();
  }
  );

  it('should create the plant ', async () => {
    const res = await request.post('/plant/create')
    .send({ name: 'maize',
    species: 'cereal',
    quantity: '1 litre',
    frequency: '3 fois par jours',
    id_user: 1})
    .set("Content-Type","Application/Json")
    .set("Accept","Application/Json")
    .set('Authorization', 'bearer ' + token);
    expect(res.status).toBe(200);
  });

  it('should gets all the plant ', async () => {
    const res = await request
      .get('/plant')
      .set("Content-Type","Application/Json")
      .set("Accept","Application/Json");

    expect(res.status).toBe(200);
  });

  it('should show the plant ', async () => {
    try{
      const res = await request
      .get(`/plant/1`)
      .set("Content-Type","Application/Json")
      .set("Accept","Application/Json");

      expect(res.status).toBe(200);
      }
      catch(error){
        console.log(error);
      }
      
  });

});
