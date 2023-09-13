import { Application, Request, Response } from "express"
import { ActiveSession, Credentials, User } from "../model/auth"

import { login } from "../service/authService"

export const authController = (app:Application) =>{
    app.get('/login', async (req: Request, res: Response) => {
        res.render('login');
    });

    app.post('/login', async(req: Request, res: Response) => {
        let data: Credentials = req.body;

        try {
            let activeSession: ActiveSession = await login(data);

            req.session.current = activeSession;

            res.redirect('/');
        } catch (e) {
            console.error(e);

            res.locals.errormessage = (e as Error).message;

            res.render('login', req.body);
        }
    });
}