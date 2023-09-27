import type { Request, Response } from "express";
import type { AxiosError } from "axios";
import JobSpecService from "../service/JobSpecService";

export class JobSpecController{
    public static async get(req: Request, res: Response){
        const {roleId} = req.params;
        const roleIdNum = await Number.parseInt(roleId)

        try{
            const jobSpecService = new JobSpecService();
            const jobSpec = await jobSpecService.getJobSpec(roleIdNum);
            res.render('ViewJobSpec.html', {title: "Job Spec", jobSpec, roleIdNum});
        } catch(e){
            const err = e as AxiosError;
            console.log(err.response?.data);
            
            res.render('error.html', {title: "Error", errorMessage: "JobSpec can't be found"});
        }
    }
}