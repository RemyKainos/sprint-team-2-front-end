import axios from 'axios';
import type { JobBand } from '../model/JobBand';

export const getAllBands = async function (): Promise<JobBand []> {
    try {
        const response = await axios.get(process.env.BACK_URL + '/api/band/')
        return response.data
    } catch (e) {
        throw new Error('Could not fetch bands')
    }
}