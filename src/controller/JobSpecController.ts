import express, { Request, Response, Application } from "express";
import axios, { Axios, AxiosError } from "axios";
const jobSpecService = require("../service/jobSpecService");

module.exports = (app: Application) =>{
    app.get('/view-job-spec/:roleId', async (req: Request, res: Response) => {
        const {roleId} = req.params;

        try{
            const jobSpec = await jobSpecService.getJobSpec(roleId);
            res.render('ViewJobSpec.html', {title: "Job Spec", jobSpec});
        } catch(e){
            const err = e as AxiosError;
            const data = err.response?.data
            res.render('error.html', {title: "Error", data});
        }
    })
}