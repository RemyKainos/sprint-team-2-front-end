import { Request, Response, Application } from "express";
import { getFamilyByCapability } from "../service/jobFamilyService";
import { JobFamily } from "../model/JobFamily";

export const jobFamilyController = (app: Application) => {
    app.get('/family-by-capability/:id', async (req: Request, res: Response) => {
        let data: JobFamily [] = []

        try {
            // TODO: Update to be ID passed in from URL
            data = await getFamilyByCapability(-1)
        } catch (e) {
            console.error(e)
        }

        res.render('family-by-capability', {families: data})
    })
}