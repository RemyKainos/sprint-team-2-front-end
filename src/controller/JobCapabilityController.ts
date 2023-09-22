import type { Request, Response } from "express";
import { getAllCapabilities } from "../service/jobCapabilityService";
import type { JobCapability } from "../model/JobCapability";

export class JobCapabilityController {
    public static async get(req: Request, res: Response): Promise<void> {
        let data: JobCapability [] = []

        try {
            data = await getAllCapabilities()

            res.render('select-capability', {capabilities: data})
        } catch (e) {
            console.error(e)

            res.locals.errormessage = (e as Error).message;

            res.render('select-capability')
        }
    }

    public static post(req: Request, res: Response): void {
        const capabilityID: number = parseInt(req.body.capabilityID)

        try {
            res.redirect('/family-by-capability/' + capabilityID)
        } catch (e) {
            console.error(e)

            res.locals.errormessage = (e as Error).message;

            res.render('select-capability')
        }
    }
}