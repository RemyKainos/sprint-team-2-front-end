import { JobRoleViewRoles } from "../model/JobRole";
import axios from 'axios';

export const viewJobRoles = async function (): Promise<JobRoleViewRoles []> {
    try {
        const response = await axios.get(process.env.BACK_URL + '/api/job-roles');
        return response.data;
    } catch (error) {
        throw new Error('Viewing job roles is not available at this time please try again later.');
    }
};

export const editJobRole = async function (id: string, updatedRoleData: any): Promise<void> {
    try {
        const response = await axios.put(`${process.env.BACK_URL}/api/job-roles/${id}`, updatedRoleData);
        return response.data;
    } catch (error) {
        throw new Error('Could not edit job role');
    }
};