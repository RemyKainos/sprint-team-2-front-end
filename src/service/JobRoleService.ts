import { JobRoleViewRoles } from "../model/JobRole";
import axios from 'axios';

export const viewJobRoles = async function (): Promise<JobRoleViewRoles []> {
    try {
        const response = await axios.get(process.env.BACK_URL + '/api/job-roles');
        return response.data;
    } catch (error) {
        throw new Error('Could not fetch job roles');
    }
};

export const deleteJobRole = async function(id: number): Promise<number> {
    try {
        const response = await axios.delete(process.env.BACK_URL + '/api/job-roles/' + id.toString());

        return response.data
    } catch (e) {
        throw new Error('Could not delete job role')
    }
}