import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import orderRoutes from './handlers/order';
import userRoutes from './handlers/user';
import productRoutes from './handlers/product';


let port = 3000;
if (process.env.ENV === 'test') {
  port = 3001;
}

const app: express.Application = express();
const address: string = ` 0.0.0.0:${port}`;
const routes = express.Router();

app.use(bodyParser.json());

app.get('/', function (req: Request, res: Response) {
  res.send(
    '<h1 >Welcome to Store-Front API</h1> read the README to manage the routes'
  );
});

app.listen(port, function () {
  console.log(`starting app on: ${address}`);
});
orderRoutes(app);
userRoutes(app);
productRoutes(app);
export default app;
