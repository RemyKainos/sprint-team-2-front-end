import { Request, Response, Application } from "express";
import { getFamilyByCapability } from "../service/jobFamilyService";
import { JobFamily } from "../model/JobFamily";
import { getCapabilityById } from "../service/jobCapabilityService";
import { JobCapability } from "../model/JobCapability";

export const jobFamilyController = (app: Application) => {
    app.get('/family-by-capability/:id', async (req: Request, res: Response) => {
        const capabilityID: number = parseInt(req.params.id)
        let data: JobFamily [] = []
        let capability: JobCapability = new JobCapability()

        try {
            // TODO: Update to be ID passed in from URL
            data = await getFamilyByCapability(capabilityID)
            capability = await getCapabilityById(capabilityID)
        } catch (e) {
            console.error(e)
        }

        res.render('family-by-capability', {families: data, capability: capability})
    })
}