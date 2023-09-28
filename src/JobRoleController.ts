import { Request, Response } from "express";
import { viewJobRoles, viewJobRoleWithFilter, deleteJobRole, getJobRoleById  } from "./service/JobRoleService"
import type { JobRoleFilter, JobRoleViewRoles } from "./model/JobRole";
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
                bandID: req.body.bandNameFilter,
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

    public static getDelete = async function(req:Request, res:Response): Promise<void> {
        if (isNaN(parseInt(req.params.id))) {
            res.locals.errormessage = 'Invalid Job Role ID Selected';
            
            res.render('delete-job-role')
        } else {

            const deleteId = parseInt(req.params.id)

            try {
                const jobRole: JobRoleViewRoles = await getJobRoleById(deleteId)

                res.render('delete-job-role', {id: deleteId, jobRole: jobRole})
            } catch (e) {
                console.error(e)

                res.locals.errormessage = (e as Error).message;

                res.render('delete-job-role');
            }
        }
    }

    public static postDelete = async function(req:Request, res:Response): Promise<void> {
        const shouldDeleteJobRole: string = req.body.shouldDeleteJobRole 
        const deleteId: number = req.body.deleteId
        let rowsDeleted: number

        if (shouldDeleteJobRole === 'true') {
            try {
                rowsDeleted = await deleteJobRole(deleteId)

                if (rowsDeleted != 1) {
                    throw new Error('Unable to delete job role - unexpected number of rows deleted')
                } else {
                    res.redirect('/view-roles')
                }
            } catch (e) {
                console.error(e)

                res.locals.errormessage = (e as Error).message

                res.render('delete-job-role', req.params, req.body)
            }
        } else {
            res.redirect('/view-job-spec/' + deleteId.toString());
        }
    }
}
