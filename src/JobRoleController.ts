import { Request, Response } from "express";
import { viewJobRoles, viewJobRoleWithFilter } from "./service/JobRoleService"
import { JobRoleFilter } from "./model/JobRole";
import { getAllCapabilities } from "./service/jobCapabilityService";
import { getAllBands } from "./service/jobBandService";

export class JobRoleController {
    


    public static get = async function(req:Request, res:Response): Promise<void> {

        const filters: JobRoleFilter = {
            roleNameFilter: "",
            bandID: 0,
            capabilityID: 0
        }
        
        try{
            const roles = await viewJobRoles();
            const capabilities = await getAllCapabilities()
            const bands = await getAllBands()
            res.render('ViewRoles.html', {title: "View Roles", roles: roles, bands: bands, capabilities: capabilities, filters: filters})
        } catch(e){
            console.error(e);
            res.render('ViewRoles.html', {title: "View Roles Error", errorMessage: e as string})
        }
    }

    public static post = async function(req: Request, res: Response): Promise<void> {
        
        const capabilities = await getAllCapabilities()
        const bands = await getAllBands()

        let filters: JobRoleFilter = {
            roleNameFilter: '',
            bandID: 0,
            capabilityID: 0
        }

        if(req.body.button === 'filterButton'){
            filters = {
                roleNameFilter: req.body.roleNameFilter,
                bandID: req.body.bandNameFilter, //this is broke rn
                capabilityID: req.body.capabilityNameFilter
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
