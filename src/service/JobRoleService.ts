import { JobRoleViewRoles } from "../model/JobRole";
import axios from 'axios';

export const viewJobRoles = async function (token?:string): Promise<JobRoleViewRoles []> {
    try {
        const response = await axios.get(process.env.BACK_URL + '/api/job-roles', {
            headers:{Authorization: `Bearer ${token}`},
        });
        return response.data;
    } catch (error) {
        throw new Error('Could not fetch job roles');
    }
};