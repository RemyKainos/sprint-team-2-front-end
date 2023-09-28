import axios from 'axios';
import { JobCapability, JobCapabilityRequest } from '../model/JobCapability';
import { isValidCapability } from '../validator/CapabilityValidator';

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

export const addCapability = async function (capability: JobCapabilityRequest, token?:string): Promise<number> {
    const error: string = isValidCapability(capability)

    if (error) {
        throw new Error(error)
    }

    try {
        const response = await axios.post(process.env.BACK_URL + '/api/capability/', capability, {
            headers:{Authorization: `Bearer ${token}`},
        })
        return response.data
    } catch (e) {
        throw new Error('Could not add capability')
    }
}