import { Request, Response } from "express";
import { deleteJobRole, viewJobRoles } from "./service/JobRoleService"

export class JobRoleController {
    public static get = async function(req:Request, res:Response): Promise<void> {
        try{
            const roles = await viewJobRoles();
            res.render('ViewRoles.html', {title: "View Roles", roles: roles})
        } catch(e){
            console.error(e);
        }
    }

    public static getDelete = async function(req:Request, res:Response): Promise<void> {
        // TODO: rewrite to take the ID of the selected request - do same as in JobFamilyController
        res.render('delete-job-role')
    }

    public static postDelete = async function(req:Request, res:Response): Promise<void> {
        // TODO: Rewrite here to get id of selected - do same as in JobFamilyController
        const id: number = req.body.id
        const shouldDeleteJobRole: string = req.body.shouldDeleteJobRole 
        let rowsDeleted: number

        if (shouldDeleteJobRole === 'true') {
            try {
                rowsDeleted = await deleteJobRole(id)

                if (rowsDeleted != 1) {
                    throw new Error('Unable to delete job role - unexpected number of rows deleted')
                } else {
                    // TODO: redirect to viewRoles page
                    res.redirect('/')
                }
            } catch (e) {
                console.error(e)

                res.locals.errormessage = (e as Error).message

                res.render('delete-job-role', req.body)
            }
        } else {
            res.redirect('back');
        }
    }
}
