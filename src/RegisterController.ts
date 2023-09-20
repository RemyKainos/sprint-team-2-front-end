import type { Request, Response } from "express"
import { User } from "./model/auth";
import { register } from "./service/authService";

export class RegisterController {

    public static get(req:Request, res:Response): void {
        res.render('register')
    }


    public static async post( req: Request, res: Response): Promise<void> {
        const data: User = req.body;

        try {
            await register(data)

            res.redirect('/login');
        } catch (e) {
            console.error(e);

            res.locals.errormessage = (e as Error).message;

            res.render('register', req.body);
        }
    }
}