import { Request, Response } from "express";
import { viewJobRoles } from "./service/JobRoleService"
import { editJobRole, fetchRoleById } from "./service/JobRoleService";

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

    public static loadEditPage = async function (req: Request, res: Response): Promise<void> {
        try {
            const id = req.params.id; // Get the ID from the request params

            if (!id) {
                throw new Error('Missing role ID');
            }

            const role = await fetchRoleById(id); // Fetch the role data by ID

            if (!role) {
                throw new Error('Role not found');
            }

            res.render('EditRole.html', { title: `Edit Role: ${role.roleName}`, role });
        } catch (e) {
            console.error(e);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    public static submitEditForm = async function (req: Request, res: Response): Promise<void> {
        try {
            const id = req.params.id; // Assuming you can get the ID from the request params
            const updatedRoleData = req.body; // Assuming the updated role data is sent in the request body
    
            await editJobRole(id, updatedRoleData); // Update the role data using the service function
    
            res.redirect('/view-roles'); // Redirect to the view roles page after editing
        } catch (e) {
            console.error(e);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}