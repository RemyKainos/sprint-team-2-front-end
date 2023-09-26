import { Request, Response } from "express";
import { viewJobRoles, viewJobRoleWithFilter } from "./service/JobRoleService"
import { JobRoleFilter } from "./model/JobRole";
import { getAllCapabilities } from "./service/jobCapabilityService";

export class JobRoleController {

    public static get = async function(req:Request, res:Response): Promise<void> {
        try{
            const roles = await viewJobRoles();
            const capabilities = await getAllCapabilities()
            res.render('ViewRoles.html', {title: "View Roles", roles: roles, capabilities: capabilities})
        } catch(e){
            console.error(e);
            res.render('ViewRoles.html', {title: "View Roles Error", errorMessage: e as string})
        }
    }

    public static post = async function(req: Request, res: Response): Promise<void> {
        try{
            
            const data: JobRoleFilter = {
                roleNameFilter: req.body.roleNameFilter,
                bandNameFilter: req.body.bandNameFilter,
                capabilityNameFilter: req.body.capabilityNameFilter
            }

            const roles = await viewJobRoleWithFilter(data);

            const capabilities = await getAllCapabilities()
            res.render('ViewRoles.html', {title: "View Roles", roles: roles, capabilities: capabilities})
        } catch(e){
            console.error(e)
            res.render('ViewRoles.html', {title: "View Roles Error", errorMessage: e as string})
        }
    }
}
