import express, { type Request, type Response, type Application } from "express";
import expressSession from 'express-session';
import { ActiveSession } from './model/auth';
import path from "path";
import nunjucks from 'nunjucks';
import router from "./router";

const app: Application = express();

const appViews = path.join(__dirname, '/views/');

const nunjucksConfig = {
    autoescape: true,
    noCache: true,
    express: app
};

nunjucks.configure(appViews, nunjucksConfig);

// Configure Express.
app.set("view engine", "html");

app.use('/public', express.static(path.join(__dirname, 'public')));

app.use(express.json())
app.use(express.urlencoded({extended: true}))

nunjucks.configure(appViews, nunjucksConfig);

app.use('/public', express.static(path.join(__dirname, 'public')));


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

app.use('/', router);
app.get('/', (req: Request, res: Response) => {
    res.redirect('/login');
});

const port = 3000;
const server = app.listen(port, () => console.log(`Express is listening on port ${port}`));

module.exports = server;