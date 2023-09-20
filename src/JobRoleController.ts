import { Request, Response } from "express";
import { viewJobRoles } from "./service/JobRoleService"

export class JobRoleController {
    public static get = async function(req:Request, res:Response): Promise<void> {
        try{
            const roles = await viewJobRoles();

            console.log(roles);

            res.render('ViewRoles.html', {roles: roles})
        } catch(e){
            console.error(e);
        }
    }
}
