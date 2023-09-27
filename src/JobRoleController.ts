import { Request, Response } from "express";
import { viewJobRoles, viewJobRoleWithFilter } from "./service/JobRoleService"
import { JobRoleFilter } from "./model/JobRole";
import { getAllCapabilities } from "./service/jobCapabilityService";

export class JobRoleController {
    


    public static get = async function(req:Request, res:Response): Promise<void> {
        console.log("dabbay")
        
        const bands = 
        ["Leadership Community", "Principal", "Manager", "Consultant", "Senior Associate", "Associate", "Trainee", "Apprentice"]

        const filters: JobRoleFilter = {
            roleNameFilter: "",
            bandNameFilter: "",
            capabilityNameFilter: ""
        }
        
        try{
            const roles = await viewJobRoles();
            const capabilities = await getAllCapabilities()
            res.render('ViewRoles.html', {title: "View Roles", roles: roles, bands: bands, capabilities: capabilities, filters: filters})
        } catch(e){
            console.error(e);
            res.render('ViewRoles.html', {title: "View Roles Error", errorMessage: e as string})
        }
    }

    public static post = async function(req: Request, res: Response): Promise<void> {
        const bands = 
        ["Leadership Community", "Principal", "Manager", "Consultant", "Senior Associate", "Associate", "Trainee", "Apprentice"]
        
        const capabilities = await getAllCapabilities()

        console.log(req.body)
        console.log(req.body.button)

        let filters: JobRoleFilter = {
            roleNameFilter: "",
            bandNameFilter: "",
            capabilityNameFilter: ""
        }

        if(req.body.button === 'filterButton'){
            filters = {
                roleNameFilter: req.body.roleNameFilter,
                bandNameFilter: req.body.bandNameFilter,
                capabilityNameFilter: req.body.capabilityNameFilter
            }
        }

        try{
            const roles = await viewJobRoleWithFilter(filters);
            res.render('ViewRoles.html', {title: "View Roles", roles: roles, bands: bands, capabilities: capabilities, filters: filters})
        } catch(e){
            console.log(e)
            res.render('ViewRoles.html', {title: "View Roles Error", errorMessage: e as string})
        }
    }
}
