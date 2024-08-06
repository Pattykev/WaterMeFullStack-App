import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import userRoutes from './handlers/user';
import plantRoutes from './handlers/plant';
import notifyRoutes from './handlers/notification';


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
    '<h1 >Welcome to Water Me API</h1> read the README to manage the routes'
  );
});

app.listen(port, function () {
  console.log(`starting app on: ${address}`);
});
userRoutes(app);
plantRoutes(app);
notifyRoutes(app);
export default app;
