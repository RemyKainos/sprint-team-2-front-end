import { JobRoleViewRoles } from "../model/JobRole";
import axios from 'axios';

export const viewJobRoles = async function (token?:string): Promise<JobRoleViewRoles []> {
    try {
        const response = await axios.get(process.env.BACK_URL + '/api/job-roles', {
            headers:{Authorization: `Bearer ${token}`},
        });
        return response.data;
    } catch (error) {
        throw new Error('Viewing job roles is not available at this time please try again later.');
    }
};

export const deleteJobRole = async function(id: number, token?:string): Promise<number> {
    try {
        const response = await axios.delete(process.env.BACK_URL + '/api/job-roles/' + id.toString(), {
            headers:{Authorization: `Bearer ${token}`},
        });

        return response.data
    } catch (e) {
        throw new Error('Could not delete job role')
    }
}

export const getJobRoleById = async function(id: number): Promise<JobRoleViewRoles> {
    try {
        const response = await axios.get(process.env.BACK_URL + '/api/job-roles/' + id.toString());

        return response.data
    } catch (e) {
        throw new Error('Could not get job role')
    }
}