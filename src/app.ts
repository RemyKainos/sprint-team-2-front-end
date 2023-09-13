import express, {type Express, type Request, type Response, type Application, type response} from 'express';

const app: Application = express();


app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

const port = 3000;
app.listen(port, () => console.log(`Express is listening on port ${port}`));
