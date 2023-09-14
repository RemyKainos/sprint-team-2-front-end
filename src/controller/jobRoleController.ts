import { Application, Request, Response } from "express";
import { deleteJobRole } from "../service/jobRoleService";

export const jobRoleController = (app:Application) => {
    app.get('/delete-job-role', async (req: Request, res: Response) => {
        res.render('delete-job-role')
    })
    
    app.post('/delete-job-role', async (req: Request, res: Response) => {
        let id: Number = req.body.id
        let shouldDeleteJobRole: String = req.body.shouldDeleteJobRole 
        let rowsDeleted: Number

        if (shouldDeleteJobRole === 'true') {
            try {
                rowsDeleted = await deleteJobRole(id)

                if (rowsDeleted != 1) {
                    throw new Error('Unable to delete job role - unexpected number of rows deleted')
                } else {
                    // TODO: Redirect to correct page
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
    })
}