import { JobRoleFilter, JobRoleViewRoles } from "../model/JobRole";
import axios from 'axios';
import { RolesNotFoundError } from "../errors/RolesNotFoundError";

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
        if((error as any).response.data === 'No job roles were found!'){
            throw new RolesNotFoundError()
        }

        throw new Error('Viewing job roles by filter is not available at this time please try again later.')
    }
}