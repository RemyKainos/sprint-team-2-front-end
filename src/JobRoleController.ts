import { Request, Response } from "express";
import { deleteJobRole, viewJobRoles, getJobRoleById, editJobRole } from "./service/JobRoleService"
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

    public static getEdit = async function(req: Request, res: Response): Promise<void> {
        if (isNaN(parseInt(req.params.id))) {
            res.locals.errormessage = 'Invalid Job Role ID Selected';
            res.render('edit-job-role'); // Render the edit-job-role page with an error message
        } else {
            const editId = parseInt(req.params.id);
            try {
                const jobRole: JobRoleViewRoles = await getJobRoleById(editId); // Fetch job role data by ID

                if (!jobRole) {
                    res.locals.errormessage = 'Job Role not found';
                    res.render('edit-job-role'); // Render the edit-job-role page with an error message
                } else {
                    res.render('edit-job-role', { id: editId, jobRole: jobRole }); // Render the edit-job-role page with job role data
                }
            } catch (e) {
                console.error(e);
                res.locals.errormessage = (e as Error).message;
                res.render('edit-job-role'); // Render the edit-job-role page with an error message
            }
        }
    }

    public static putEdit = async function(req: Request, res: Response): Promise<void> {
        const updatedRoleData = req.body; // Assuming the updated role data is sent in the request body
        const editId = parseInt(req.params.id); // Assuming you can get the ID from the request params

        try {
            await editJobRole(editId); // Update the job role using the service function

            res.redirect('/view-roles'); // Redirect to the view roles page after editing
        } catch (e) {
            console.error(e);
            res.locals.errormessage = (e as Error).message;
            res.render('edit-job-role', { id: editId, jobRole: updatedRoleData }); // Render the edit-job-role page with an error message
        }
    }
}
