import { Application, Request, Response } from "express";
import { deleteJobRole } from "../service/jobRoleService";

export const jobRoleController = (app:Application) => {
    app.get('/delete-job-role', async (req: Request, res: Response) => {
        res.render('delete-job-role')
    })
    
    app.post('/delete-job-role', async (req: Request, res: Response) => {
        console.log("delete job role")
        let id: Number = req.body.id

        let shouldDeleteJobRole = req.body.shouldDeleteJobRole
        let rowsDeleted: Number 

        console.log(id)
        
        if (shouldDeleteJobRole) {
            try {
                rowsDeleted = await deleteJobRole(id)

                // TODO: redirect to confirmation page and confirm rowsDeleted
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