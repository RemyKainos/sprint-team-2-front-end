import { Request, Response } from "express";
import { viewJobRoles, viewJobRoleWithFilter, deleteJobRole, getJobRoleById, editJobRole  } from "./service/JobRoleService"
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
            const capabilities = await getAllCapabilities()
            const bands = await getAllBands()
            const roles = await viewJobRoles(req.session.token);
            res.render('ViewRoles.html', {title: "View Roles", roles: roles, user:req.session.user, bands: bands, capabilities: capabilities, filters: filters})
        } catch(e){
            console.error(e);
            res.render('ViewRoles.html', {title: "View Roles Error", errorMessage: e as string, user: req.session.user})
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
            res.render('ViewRoles.html', {title: "View Roles", user: req.session.user, roles: roles, bands: bands, capabilities: capabilities, filters: filters})
        } catch(e){
            console.log(e)
            res.render('ViewRoles.html', {title: "View Roles Error", errorMessage: e as string, user: req.session.user})
        }
    }    

    public static getDelete = async function(req:Request, res:Response): Promise<void> {
        if (isNaN(parseInt(req.params.id))) {
            res.locals.errormessage = 'Invalid Job Role ID Selected';
            
            res.render('delete-job-role', {user: req.session.user})
        } else {

            const deleteId = parseInt(req.params.id)

            try {
                const jobRole: JobRoleViewRoles = await getJobRoleById(deleteId)

                res.render('delete-job-role', {id: deleteId, jobRole: jobRole, user: req.session.user})
            } catch (e) {
                console.error(e)

                res.locals.errormessage = (e as Error).message;

                res.render('delete-job-role', {user: req.session.user});
            }
        }
    }

    public static postDelete = async function(req:Request, res:Response): Promise<void> {
        const shouldDeleteJobRole: string = req.body.shouldDeleteJobRole 
        const deleteId: number = req.body.deleteId
        let rowsDeleted: number

        if (shouldDeleteJobRole === 'true') {
            try {
                rowsDeleted = await deleteJobRole(deleteId, req.session.token)

                if (rowsDeleted != 1) {
                    throw new Error('Unable to delete job role - unexpected number of rows deleted')
                } else {
                    res.redirect('/view-roles')
                }
            } catch (e) {
                console.error(e)

                res.locals.errormessage = (e as Error).message

                res.render('delete-job-role', {params: req.params, body: req.body, user: req.session.user})
            }
        } else {
            res.redirect('/view-job-spec/' + deleteId.toString());
        }
    }

    public static getEdit = async function(req: Request, res: Response): Promise<void> {
        if (isNaN(parseInt(req.params.id))) {
            res.locals.errormessage = 'Invalid Job Role ID Selected';
            res.render('edit-job-role', {user:req.session.user}); 
        } else {
            const editId = parseInt(req.params.id);
            try {
                const jobRole: JobRoleViewRoles = await getJobRoleById(editId); 

                if (!jobRole) {
                    res.render('edit-job-role', {error: "Job Role not found", user:req.session.user}); 
                } else {
                    res.render('edit-job-role', { id: editId, jobRole: jobRole, user:req.session.user });
                }
            } catch (e) {
                console.error(e);
                res.locals.errormessage = (e as Error).message;
                res.render('edit-job-role', {user:req.session.user}); 
            }
        }
    }

    public static putEdit = async function(req: Request, res: Response): Promise<void> {
        const updatedRoleData = req.body; 
        const editId = parseInt(req.body.editId);

        try {
            await editJobRole(editId, updatedRoleData, req.session.token);
            
            res.redirect('/view-roles'); 
        } catch (e) {
            console.error(e);
            res.locals.errormessage = (e as Error).message;
            res.render('edit-job-role', { id: editId, jobRole: updatedRoleData, user:req.session.user });
        }
    }
}
