import { Request, Response, Application } from "express";
import { AxiosError } from "axios";
import jobSpecService from "../service/JobSpecService";

export default (app: Application) =>{
    app.get('/view-job-spec/:roleId', async (req: Request, res: Response) => {
        const {roleId} = req.params;
        const roleIdNum = await Number.parseInt(roleId)

        try{
            const jobSpec = await jobSpecService.getJobSpec(roleIdNum);
            res.render('ViewJobSpec.html', {title: "Job Spec", jobSpec});
        } catch(e){
            console.log(e);
            const err = e as AxiosError;
            const data = err.response?.data
            res.render('error.html', {title: "Error", data});
        }
    })
}