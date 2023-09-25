import { Request, Response } from "express";
import { viewJobRoles } from "./service/JobRoleService"
//import { JobRoleFilter } from "./model/JobRole";

export class JobRoleController {

    public static get = async function(req:Request, res:Response): Promise<void> {
        try{
            const roles = await viewJobRoles();
            res.render('ViewRoles.html', {title: "View Roles", roles: roles})
        } catch(e){
            console.error(e);
            res.render('ViewRoles.html', {title: "View Roles Error", errorMessage: e as string})
        }
    }

    /*public static post = async function(req: Request, res: Response): Promise<void> {
        try{
            const data: JobRoleFilter = req.body


        } catch(e){

        }
    }*/
}
