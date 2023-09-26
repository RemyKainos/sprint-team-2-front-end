import type { Request, Response } from "express"
import { ActiveSession, Credentials } from "./model/auth";
import { login, whoami } from "./service/authService";


export class LoginController {

    public static get(req:Request, res:Response): void {
        res.render('login')
    }

    public static async post(req:Request, res:Response): Promise<void> {
        const data: Credentials = req.body;

        try {
            req.session.token = await login(data);
            console.log(req.session.token)
            req.session.user = await whoami(req.session.token);
            console.log(JSON.stringify(req.session))

            res.redirect('/view-roles');
        } catch (e) {
            console.error(e);

            res.locals.errormessage = (e as Error).message;

            res.render('login', req.body);
        }
    }

    public static logOut(req:Request, res:Response): void{
        req.session.destroy(() => {
            res.redirect('/');
        });
    }
}