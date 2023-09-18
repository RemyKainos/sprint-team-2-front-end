import type { NextFunction, Request, Response } from "express";

export default function (req: Request, res: Response, next: NextFunction) {
    if (req.session.current) {
        next();
    } else {
        res.redirect('/login');
    }
}