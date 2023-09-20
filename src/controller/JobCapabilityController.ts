import { Request, Response, Application } from "express";
import { getAllCapabilities } from "../service/jobCapabilityService";
import { JobCapability } from "../model/JobCapability";

export const jobCapabilityController = (app: Application) => {
    app.get('/select-capability', async (req: Request, res: Response) => {
        let data: JobCapability [] = []

        try {
            data = await getAllCapabilities()
        } catch (e) {
            console.error(e)
        }

        res.render('select-capability', {capabilities: data})
    })

    app.post('/select-capability', async (req: Request, res: Response) => {
        const capabilityID: number = req.body.capabilityID

        try {
            res.redirect('/family-by-capability/' + capabilityID)
        } catch (e) {
            console.error(e)

            res.render('select-capabilities')
        }
    })
}