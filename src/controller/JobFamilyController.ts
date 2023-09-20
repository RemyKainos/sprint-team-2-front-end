import { Request, Response, Application } from "express";
import { getFamilyByCapability } from "../service/jobFamilyService";
import { JobFamily } from "../model/JobFamily";
import { getCapabilityById } from "../service/jobCapabilityService";
import { JobCapability } from "../model/JobCapability";

export class JobFamilyController {
    public static async get(req: Request, res: Response): Promise<void> {
        const capabilityID: number = parseInt(req.params.id)
        let data: JobFamily [] = []
        let capability: JobCapability = new JobCapability()

        try {
            data = await getFamilyByCapability(capabilityID)
            capability = await getCapabilityById(capabilityID)
        } catch (e) {
            console.error(e)
        }

        res.render('family-by-capability', {families: data, capability: capability})
    }
}