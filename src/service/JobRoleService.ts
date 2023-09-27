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

export const fetchRoleById = async function (id: string): Promise<JobRoleViewRoles | null> {
    try {
        // Replace this with your database or data source query to fetch the role data by ID
        // For example, if you have an API endpoint to retrieve role data:
        const response = await axios.get(`${process.env.BACK_URL}/api/job-roles/${id}`);

        // Assuming the API returns the role data as response.data
        return response.data;
    } catch (error) {
        console.error(error);
        return null; // Return null if there's an error or the role is not found
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