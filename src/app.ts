import express, {type Request, type Response, type Application} from "express";
import nunjucks from "nunjucks";
import path from "path";
import { jobFamilyController } from "./controller/JobFamilyController";
import { jobCapabilityController } from "./controller/JobCapabilityController";

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

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!');
});

const port = 3000;
app.listen(port, () => console.log(`Express is listening on port ${port}`));

jobFamilyController(app)
jobCapabilityController(app)