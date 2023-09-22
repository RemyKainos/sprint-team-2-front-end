import type { Request, Response } from "express";
import { getFamilyByCapability } from "../service/jobFamilyService";
import type { JobFamily } from "../model/JobFamily";
import { getCapabilityById } from "../service/jobCapabilityService";
import type { JobCapability } from "../model/JobCapability";

export class JobFamilyController {
    public static async get(req: Request, res: Response): Promise<void> {
        if (isNaN(parseInt(req.params.id))) {
            res.locals.errormessage = 'Invalid Capability ID Selected';

            res.render('family-by-capability')
        } else {

            const capabilityID: number = parseInt(req.params.id)

            try {
                let data: JobFamily [] = []

                data = await getFamilyByCapability(capabilityID)
                const capability: JobCapability = await getCapabilityById(capabilityID)

                res.render('family-by-capability', {families: data, capability: capability})
            } catch (e) {
                console.error(e)

                res.locals.errormessage = (e as Error).message;

                res.render('family-by-capability')
            }
        }
    }
}