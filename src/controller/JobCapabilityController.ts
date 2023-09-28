import type { Request, Response } from "express";
import { addCapability, getAllCapabilities } from "../service/jobCapabilityService";
import type { JobCapability, JobCapabilityRequest } from "../model/JobCapability";

export class JobCapabilityController {
    public static async get(req: Request, res: Response): Promise<void> {
        let data: JobCapability [] = []

        try {
            data = await getAllCapabilities()

            res.render('select-capability', {capabilities: data, user: req.session.user})
        } catch (e) {
            console.error(e)

            res.locals.errormessage = (e as Error).message;

            res.render('select-capability', {user: req.session.user})
        }
    }

    public static post(req: Request, res: Response): void {
        const capabilityID: number = parseInt(req.body.capabilityID)

        try {
            res.redirect('/family-by-capability/' + capabilityID)
        } catch (e) {
            console.error(e)

            res.locals.errormessage = (e as Error).message;

            res.render('select-capability', {user: req.session.user})
        }
    }

    public static getAddCapability(req: Request, res: Response): void {
        res.render('add-capability', {user: req.session.user})
    }

    public static async postAddCapability(req: Request, res: Response): Promise<void> {
        const capabilityName: string = req.body.name

        const jobCapability: JobCapabilityRequest = {
            name: capabilityName
        }

        try {
            const capabilityID: number = await addCapability(jobCapability, req.session.token)

            if (capabilityID != 0) {
                res.redirect('/view-roles/')
            } else {
                throw new Error('Capability could not be added')
            }
        } catch (e) {
            console.error(e)

            res.locals.errormessage = (e as Error).message;

            res.render('add-capability', {user: req.session.user})
        }
    }
}