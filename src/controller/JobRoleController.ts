import { Request, Response, Application } from "express";
const jobRoleService = require('../service/JobRoleService')

module.exports = function(app: Application){
    app.get('/ViewRoles', async (req: Request, res: Response) => {
        let data = []

        try{
            data = await jobRoleService.viewJobRoles()
        } catch(e){
            console.error(e);
        }
        res.render('ViewRoles.html', {roles: data})
    })
}