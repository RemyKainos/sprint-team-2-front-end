import { Request, Response } from "express";
import { viewJobRoles } from "./service/JobRoleService"
import { editJobRole } from "./service/JobRoleService";

export class JobRoleController {
    public static get = async function(req:Request, res:Response): Promise<void> {
        try{
            const roles = await viewJobRoles();
            res.render('ViewRoles.html', {title: "View Roles", roles: roles})
        } catch(e){
            console.error(e);
        }
    }

    public static edit = async function (req: Request, res: Response): Promise<void> {
        try {
            res.render('/edit-job-spec/{{jobSpec.id}}')
            const id = req.params.id; // Assuming you can get the ID from the request params
            const updatedRoleData = req.body; // Assuming the updated role data is sent in the request body

            await editJobRole(id, updatedRoleData);

            res.redirect('/view-roles'); // Redirect to the view roles page after editing
        } catch (e) {
            console.error(e);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}