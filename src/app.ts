import express, {type Express, type Request, type Response, type Application, type response} from "express";
import authMiddleware from './middleware/auth';
import expressSession from 'express-session';
import { ActiveSession } from './model/auth';
import { authController } from "./controller/authController";
import path from "path";
import nunjucks from 'nunjucks';



const app: Application = express();

// Configure Nunjucks.
const appViews = path.join(__dirname, "/views/templates/")

const nunjucksConfig = {
    autoescape : true,
    noCache : true,
    express : app
};

nunjucks.configure(appViews, nunjucksConfig);

// Configure Express.
app.set("view engine", "html");

app.use(express.json());
app.use(express.urlencoded({ extended : true}))

app.use(expressSession({secret : "NOT HARDCODED SECRET", cookie : {maxAge : 60000}}))


declare module "express-session" {
  interface SessionData {
      current?: ActiveSession;
  }
}


authController(app);

app.use(authMiddleware);
app.get('/', (req: Request, res: Response) => {
  res.render('login');
});

const port = 3000;
app.listen(port, () => console.log(`Express is listening on port ${port}`));


