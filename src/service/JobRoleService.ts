import {JobRole} from "../model/JobRole"
import axios from 'axios';

export const viewJobRoles = async function (): Promise<JobRole []> {
    try{
        const response: JobRole [] = await axios.get(process.env.BACK_URL + '/api/job-roles')
        return response
    } catch(e) {
        throw new Error('Could not fetch job roles')

    }
}
