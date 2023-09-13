import express, {type Express, type Request, type Response, type Application, type response} from "express";
import nunjucks from "nunjucks";
import path from "path";

const app: Application = express();

const appViews = path.join(__dirname, '/views/');

const nunjucksConfig = {
    autoescape: true,
    noCache: true,
    express: app
  };

nunjucks.configure(appViews, nunjucksConfig);

app.use('/public', express.static(path.join(__dirname, 'public')));

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/', (req: Request, res: Response) => {
  res.render('index.html', {title: "Home"});
});

const port = 3000;
app.listen(port, () => console.log(`Express is listening on port ${port}`));
