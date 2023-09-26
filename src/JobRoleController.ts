import { Request, Response } from "express";
import { viewJobRoles, viewJobRoleWithFilter } from "./service/JobRoleService"
import { JobRoleFilter } from "./model/JobRole";
import { getAllCapabilities } from "./service/jobCapabilityService";

export class JobRoleController {
    


    public static get = async function(req:Request, res:Response): Promise<void> {
        const bands = 
        ["Leadership Community", "Principal", "Manager", "Consultant", "Senior Associate", "Associate", "Trainee", "Apprentice"]
        
        try{
            const roles = await viewJobRoles();
            const capabilities = await getAllCapabilities()
            res.render('ViewRoles.html', {title: "View Roles", roles: roles, bands: bands, capabilities: capabilities})
        } catch(e){
            console.error(e);
            res.render('ViewRoles.html', {title: "View Roles Error", errorMessage: e as string})
        }
    }

    public static post = async function(req: Request, res: Response): Promise<void> {
        const bands = 
        ["Leadership Community", "Principal", "Manager", "Consultant", "Senior Associate", "Associate", "Trainee", "Apprentice"]
        try{
            
            const data: JobRoleFilter = {
                roleNameFilter: req.body.roleNameFilter,
                bandNameFilter: req.body.bandNameFilter,
                capabilityNameFilter: req.body.capabilityNameFilter
            }

            console.log(data);

            const roles = await viewJobRoleWithFilter(data);

            const capabilities = await getAllCapabilities()
            res.render('ViewRoles.html', {title: "View Roles", roles: roles, bands: bands, capabilities: capabilities, filters: data})
        } catch(e){
            console.error(e)
            res.render('ViewRoles.html', {title: "View Roles Error", errorMessage: e as string})
        }
    }
}
