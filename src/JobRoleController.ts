import { Request, Response } from "express";
import { deleteJobRole, viewJobRoles, getJobRoleById } from "./service/JobRoleService"
import { JobRoleViewRoles } from "./model/JobRole";

export class JobRoleController {

    public static get = async function(req:Request, res:Response): Promise<void> {
        try{
            const roles = await viewJobRoles(req.session.token);
            res.render('ViewRoles.html', {title: "View Roles", roles: roles, user: req.session.user})
        } catch(e){
            console.error(e);
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
                rowsDeleted = await deleteJobRole(deleteId)

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
}
