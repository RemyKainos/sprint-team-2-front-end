import { Request, Response } from "express";
import { viewJobRoles } from "./service/JobRoleService"

export class JobRoleController {
    public static get = async function(req:Request, res:Response): Promise<void> {
        try{
            const roles = await viewJobRoles(req.session.token);
            res.render('ViewRoles.html', {title: "View Roles", roles: roles})
        } catch(e){
            console.error(e);
        }
    }
}
