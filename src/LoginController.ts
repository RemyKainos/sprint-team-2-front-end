import type { Request, Response } from "express"
import { ActiveSession, Credentials } from "./model/auth";
import { login } from "./service/authService";


export class LoginController {

    public static get(req:Request, res:Response): void {
        res.render('login')
    }

    public static async post(req:Request, res:Response): Promise<void> {
        const data: Credentials = req.body;

        try {
            const activeSession: ActiveSession = await login(data);

            req.session.current = activeSession;

            res.redirect('/view-roles');
        } catch (e) {
            console.error(e);

            res.locals.errormessage = (e as Error).message;

            res.render('login', req.body);
        }
    }
}