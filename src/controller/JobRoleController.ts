import express, { Request, Response, Application } from "express";
import { JobRole } from "../model/JobRole";

const {render} = require('nunjucks');
const jobRoleService = require('../service/JobRoleService')

module.exports = function(app: Application){
    app.get('/ViewRoles', async (req: Request, res: Response) => {
        let data = []

        try{
            data = await jobRoleService.viewRoles()
        } catch(e){
            console.error(e);
        }
        res.render('ViewRoles.html', {roles: data})
    })
}