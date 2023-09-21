import axios from 'axios';
import { JobCapability } from '../model/JobCapability';

export const getAllCapabilities = async function (): Promise<JobCapability []> {
    try {
        const response = await axios.get(process.env.BACK_URL + '/api/capability/')
        return response.data
    } catch (e) {
        throw new Error('Could not fetch capabilities')
    }
}

export const getCapabilityById = async function (id: number): Promise<JobCapability> {
    try {
        const response = await axios.get(process.env.BACK_URL + '/api/capability/' + id)
        return response.data
    } catch (e) {
        throw new Error('Could not fetch capability')
    }
}