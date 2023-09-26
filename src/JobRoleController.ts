import { Request, Response } from "express";
import { deleteJobRole, viewJobRoles, getJobRoleById } from "./service/JobRoleService"
import { JobRoleViewRoles } from "./model/JobRole";

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

    // TODO: REMOVE
    public static getTemp = async function(req:Request, res:Response): Promise<void> {
        res.render('temp-delete-job-role')
    }

    // TODO: REMOVE and put in post of job spec delete button method
    public static postTemp = async function(req:Request, res:Response): Promise<void> {
        if (isNaN(parseInt(req.body.id))) {
            res.locals.errormessage = 'Invalid Job Role ID Selected';
            
            // TODO: Update link
            res.render('temp-delete-job-role')
        } else {
            req.session.deleteId = parseInt(req.body.id)

            res.redirect('/delete-job-role/' + req.session.deleteId)
        }
    }

    public static getDelete = async function(req:Request, res:Response): Promise<void> {
        // TODO: rewrite to take the ID of the selected request - do same as in JobFamilyController
        if (isNaN(parseInt(req.params.id))) {
            res.locals.errormessage = 'Invalid Job Role ID Selected';
            
            // TODO: Update link
            res.render('temp-delete-job-role')
        } else {

            req.session.deleteId = parseInt(req.params.id)

            try {
                const jobRole: JobRoleViewRoles = await getJobRoleById(req.session.deleteId)

                res.render('delete-job-role', {id: req.session.deleteId, jobRole: jobRole})
            } catch (e) {
                console.error(e)

                res.locals.errormessage = (e as Error).message;

                res.render('temp-delete-job-role');
            }
        }
    }

    public static postDelete = async function(req:Request, res:Response): Promise<void> {
        // TODO: Rewrite here to get id of selected - do same as in JobFamilyController
        const shouldDeleteJobRole: string = req.body.shouldDeleteJobRole 
        let rowsDeleted: number

        console.log(req.session.deleteId)

        if (shouldDeleteJobRole === 'true') {
            try {
                rowsDeleted = await deleteJobRole(req.session.deleteId as number)

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
            // TODO: update to be previous page
            res.redirect('/temp-delete-job-role/');
        }
    }
}
