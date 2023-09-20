import { Request, Response } from "express";
import { JobRole } from "./model/JobRole";
import {viewJobRoles} from "./service/JobRoleService"

export class JobRoleController {
    public static get(req:Request, res:Response): void{
        let data: Promise<JobRole []>;

        try{
            data = viewJobRoles();

            res.render('ViewRoles.html', {roles: data})
        } catch(e){
            console.error(e);
        }
    }
}
