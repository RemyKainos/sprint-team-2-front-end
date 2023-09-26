import type { NextFunction, Request, Response } from "express";

export function login (req: Request, res: Response, next: NextFunction) {
    if (req.session.token) {
        next();
    } else {
        res.redirect('/login');
    }
}

export function role(roleRequired:string){
    return function (req:Request, res:Response, next:NextFunction){
        console.log(req.session.user?.role.role_name)
        if (req.session && (req.session.user?.role.role_name == 'Admin' || req.session.user?.role.role_name === roleRequired)) {
            return next();
        }else{
            res.locals.errorMessage = `${req.session.user?.username} is not an admin`;
        }
        res.render('forbidden');
    }
}
