import { Request, Response } from "express";
import { getAllCapabilities } from "../service/jobCapabilityService";
import { JobCapability } from "../model/JobCapability";

export class JobCapabilityController {
    public static async get(req: Request, res: Response): Promise<void> {
        let data: JobCapability [] = []

        try {
            data = await getAllCapabilities()
        } catch (e) {
            console.error(e)
        }

        res.render('select-capability', {capabilities: data})
    }

    public static post(req: Request, res: Response): void {
        const capabilityID: number = req.body.capabilityID

        try {
            res.redirect('/family-by-capability/' + capabilityID)
        } catch (e) {
            console.error(e)

            res.render('select-capabilities')
        }
    }
}