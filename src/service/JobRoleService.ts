import { JobRoleFilter, JobRoleViewRoles } from "../model/JobRole";
import axios from 'axios';

export const viewJobRoles = async function (): Promise<JobRoleViewRoles []> {
    try {
        const response = await axios.get(process.env.BACK_URL + '/api/job-roles');
        return response.data;
    } catch (error) {
        throw new Error('Viewing job roles is not available at this time please try again later.');
    }
};

export const viewJobRoleWithFilter = async function (filter: JobRoleFilter): Promise<JobRoleViewRoles []> {
    try{
        const response = await axios.post(process.env.BACK_URL + '/api/job-roles/filter/', filter)
        return response.data
    } catch(error){
        throw new Error('Viewing job roles by filter is not available at this time please try again later.')
    }
}